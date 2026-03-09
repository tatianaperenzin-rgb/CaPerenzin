
export async function checkAvailability(rooms, checkInDate, checkOutDate) {
    if (!checkInDate || !checkOutDate) return rooms; // Se nessuna data è selezionata, mostra tutte

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Normalizza a mezzanotte (ore 00:00:00) per confrontare solo i giorni
    checkIn.setHours(0, 0, 0, 0);
    checkOut.setHours(0, 0, 0, 0);

    // Valida le date inserite
    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) return rooms;

    const availableRooms = [];

    await Promise.all(rooms.map(async (room) => {
        if (!room.icsUrl) {
            availableRooms.push(room);
            return;
        }

        try {
            // Scarica il file ICS
            const response = await fetch(room.icsUrl, {
                next: { revalidate: 60 }, // Ricarica ogni minuto
                // cache: 'no-store' // Rimosso per permettere il caching ISR e velocizzare
            });

            if (!response.ok) {
                // Se il download fallisce, assumiamo disponibilità per evitare blocchi
                console.warn(`Impossibile scaricare il calendario per la stanza ${room.id}: ${response.status}`);
                availableRooms.push(room);
                return;
            }

            const icsText = await response.text();

            if (isRoomAvailable(icsText, checkIn, checkOut)) {
                availableRooms.push(room);
            }

        } catch (error) {
            console.error(`Errore nel controllo disponibilità per ${room.id}:`, error);
            // Fallback: mostra comunque la stanza in caso di errore
            availableRooms.push(room);
        }
    }));

    // Filtra e restituisce solo le stanze disponibili mantenendo l'ordine originale
    const availableIds = new Set(availableRooms.map(r => r.id));
    return rooms.filter(r => availableIds.has(r.id));
}

// Controlla se la stanza è libera verificando le sovrapposizioni con eventi esistenti
function isRoomAvailable(icsText, checkIn, checkOut) {
    const events = parseIcsEvents(icsText);

    for (const event of events) {
        if (!event.start || !event.end) continue;

        // Logica di sovrapposizione (Collisione):
        // Una prenotazione si sovrappone se:
        // (InizioRichiesto < FineEsistente) E (FineRichiesta > InizioEsistente)
        if (checkIn < event.end && checkOut > event.start) {
            return false; // Trovata collisione, stanza NON disponibile
        }
    }

    return true; // Nessuna collisione, stanza disponibile
}

// Parser manuale per leggere i file .ics
// Estrae solo gli eventi (VEVENT) con data inizio (DTSTART) e fine (DTEND)
function parseIcsEvents(icsText) {
    const events = [];
    const lines = icsText.split(/\r\n|\n|\r/);

    let inEvent = false;
    let currentEvent = {};

    for (const line of lines) {
        const trimmed = line.trim();

        if (trimmed === 'BEGIN:VEVENT') {
            inEvent = true;
            currentEvent = {};
            continue;
        }

        if (trimmed === 'END:VEVENT') {
            inEvent = false;
            if (currentEvent.start && currentEvent.end) {
                events.push(currentEvent);
            }
            continue;
        }

        if (inEvent) {
            if (trimmed.startsWith('DTSTART')) {
                currentEvent.start = parseIcsDate(trimmed);
            } else if (trimmed.startsWith('DTEND')) {
                currentEvent.end = parseIcsDate(trimmed);
            }
        }
    }

    return events;
}

function parseIcsDate(line) {
    // Esempi di righe data nel file ICS:
    // DTSTART;VALUE=DATE:20231225  --> Data pura (Giorno intero)
    // DTSTART:20231225T140000Z     --> Data e Ora UTC

    const parts = line.split(':');
    if (parts.length < 2) return null;

    const value = parts[1];

    // CASO 1: YYYYMMDD (Senza orario)
    if (value.length === 8 && !value.includes('T')) {
        const y = parseInt(value.substring(0, 4), 10);
        const m = parseInt(value.substring(4, 6), 10) - 1; // Mesi 0-11
        const d = parseInt(value.substring(6, 8), 10);
        return new Date(y, m, d);
    }

    // CASO 2: YYYYMMDDTHHMMSS... (Con orario)
    if (value.includes('T')) {
        const clean = value.replace('Z', '').replace(/-/g, '').replace(/:/g, '');

        const y = parseInt(clean.substring(0, 4), 10);
        const m = parseInt(clean.substring(4, 6), 10) - 1;
        const d = parseInt(clean.substring(6, 8), 10);

        // Ignoriamo l'ora specifica per la disponibilità giornaliera
        // Normalizziamo a mezzanotte
        return new Date(y, m, d);
    }

    return null;
}
