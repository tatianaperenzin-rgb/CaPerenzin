import { NextResponse } from 'next/server';

// Mappa wpTypeId -> slug WordPress della stanza
const WP_SLUG_MAP = {
    '17': 'breath-room',
    '20': 'solul-room',
    '22': 'blessing-room',
    '24': 'heart-room'
};

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const wpTypeId = searchParams.get('wpTypeId');

    if (!wpTypeId) {
        return NextResponse.json({ error: 'wpTypeId richiesto' }, { status: 400 });
    }

    const slug = WP_SLUG_MAP[wpTypeId];
    if (!slug) {
        return NextResponse.json({ error: 'Stanza non trovata' }, { status: 404 });
    }

    try {
        // === STEP 1: Fetch la pagina della stanza per ottenere il nonce di ricerca ===
        const roomPageRes = await fetch(`https://caperenzin.it/accommodation/${slug}/`, {
            cache: 'no-store',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        if (!roomPageRes.ok) {
            return NextResponse.json({ error: 'Errore fetch pagina stanza' }, { status: roomPageRes.status });
        }

        const roomHtml = await roomPageRes.text();

        // Estrai nonce e referer dal form della stanza
        const nonceMatch = roomHtml.match(/name="mphb-checkout-nonce"[^>]*value="([^"]*)"/);
        const refererMatch = roomHtml.match(/name="_wp_http_referer"[^>]*value="([^"]*)"/);
        const roomTypeMatch = roomHtml.match(/name="mphb_room_type_id"[^>]*value="([^"]*)"/);

        const searchNonce = nonceMatch?.[1] || '';
        const referer = refererMatch?.[1] || `/accommodation/${slug}`;
        const roomTypeId = roomTypeMatch?.[1] || wpTypeId;

        // Ottieni le date dalla query
        const checkIn = searchParams.get('checkIn');
        const checkOut = searchParams.get('checkOut');
        const adults = searchParams.get('adults') || '2';
        const children = searchParams.get('children') || '0';
        // Log richiesto dall'utente per vedere la lingua selezionata nel terminale
        const lang = searchParams.get('lang');
        console.log(`[wp-booking] Booking Request - Lingua: ${lang}, RoomType: ${wpTypeId}`);

        if (!checkIn || !checkOut) {
            // Se non ci sono date, restituisci solo il nonce di ricerca (step 1)
            return NextResponse.json({
                step: 1,
                searchNonce,
                referer,
                roomTypeId,
                slug,
                lang // Includiamo anche la lingua nella risposta, per debug
            });
        }

        // === STEP 2: Fetch la pagina dei risultati per ottenere il form di prenotazione ===
        const resultsUrl = `https://caperenzin.it/risultati-di-ricerca?mphb-checkout-nonce=${searchNonce}&_wp_http_referer=${encodeURIComponent(referer)}&mphb_room_type_id=${roomTypeId}&mphb_check_in_date=${checkIn}&mphb_check_out_date=${checkOut}&mphb_adults=${adults}&mphb_children=${children}`;

        console.log("[wp-booking] Fetching risultati:", resultsUrl);

        // Salviamo i cookies dalla prima richiesta per mantenere la sessione
        const cookies = roomPageRes.headers.get('set-cookie') || '';

        const resultsRes = await fetch(resultsUrl, {
            cache: 'no-store',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Cookie': cookies,
                'Referer': `https://caperenzin.it/accommodation/${slug}/`
            }
        });

        if (!resultsRes.ok) {
            console.log("[wp-booking] Risultati status:", resultsRes.status);
            return NextResponse.json({
                step: 1,
                searchNonce,
                referer,
                roomTypeId,
                slug,
                error: 'Pagina risultati non raggiungibile'
            });
        }

        const resultsHtml = await resultsRes.text();

        // Cerca TUTTI i form nella pagina dei risultati
        // Modifica: non filtriamo più per "conferma", prendiamo tutto e poi filtriamo per ID stanza
        const bookingFormRegex = /<form[^>]*action="([^"]*)"[^>]*method="([^"]*)"[^>]*>([\s\S]*?)<\/form>/gi;
        let bookingMatch;
        const bookingForms = [];

        while ((bookingMatch = bookingFormRegex.exec(resultsHtml)) !== null) {
            const formAction = bookingMatch[1];
            const formMethod = bookingMatch[2];
            const formContent = bookingMatch[3];

            // Estrai i campi hidden
            const hiddenFields = {};
            const inputRegex = /<input[^>]*type=["']hidden["'][^>]*>/gi;
            let inputMatch;

            while ((inputMatch = inputRegex.exec(formContent)) !== null) {
                const nameM = inputMatch[0].match(/name=["']([^"']+)["']/);
                const valueM = inputMatch[0].match(/value=["']([^"']*?)["']/);
                if (nameM) {
                    hiddenFields[nameM[1]] = valueM ? valueM[1] : '';
                }
            }

            // Estrai anche i button con name (anche senza value esplicito)
            // Molto spesso MotoPress usa <button name="mphb_book_room_type[20]">
            const buttonRegex = /<button[^>]*name=["']([^"']+)["'][^>]*>/gi;
            let buttonMatch;
            while ((buttonMatch = buttonRegex.exec(formContent)) !== null) {
                // Se c'è un value, prendilo, altrimenti metti "1" o vuoto
                const name = buttonMatch[1];
                const valueMatch = buttonMatch[0].match(/value=["']([^"']*?)["']/);
                const value = valueMatch ? valueMatch[1] : '';
                hiddenFields[name] = value;
            }

            bookingForms.push({
                action: formAction,
                method: formMethod,
                hiddenFields
            });
        }

        // console.log("[wp-booking] Booking forms trovati:", bookingForms.length);
        // console.log("[wp-booking] Cerco roomTypeId:", roomTypeId);

        if (bookingForms.length === 0) {
            // Nessun form di prenotazione trovato — probabilmente la stanza non è disponibile
            return NextResponse.json({
                step: 1,
                searchNonce,
                referer,
                roomTypeId,
                slug,
                error: 'Form di prenotazione non trovato nei risultati'
            });
        }

        // Strategia Aggiornata:
        // 1. Cerca se esiste già un form specifico per la stanza (match esatto)
        // 2. Se non c'è, prendi il form GENERICO di checkout e forziamo l'inserimento della stanza

        let selectedForm = bookingForms.find(f => {
            const keys = Object.keys(f.hiddenFields);
            return keys.some(key => key.includes(`[${roomTypeId}]`)) ||
                f.hiddenFields['mphb_room_type_id'] == roomTypeId ||
                Object.values(f.hiddenFields).some(val => val == roomTypeId);
        });

        if (selectedForm) {
            console.log("[wp-booking] MATCH ESATTO TROVATO!");
        } else {
            console.log("[wp-booking] Nessun match esatto. Cerco form GENERICO...");
            // Se non troviamo il form specifico, cerchiamo il form di checkout GENERICO
            // Lo riconosciamo perché ha 'mphb-checkout-nonce' ma NON 'mphb-checkout-recommendation-nonce'

            const genericForm = bookingForms.find(f =>
                f.hiddenFields['mphb-checkout-nonce'] &&
                !f.hiddenFields['mphb-checkout-recommendation-nonce']
            );

            if (genericForm) {
                console.log("[wp-booking] Uso form GENERICO e inietto i dettagli stanza...");
                selectedForm = { ...genericForm }; // Copia superficiale
                selectedForm.hiddenFields = { ...genericForm.hiddenFields }; // Copia hidden fields
            } else {
                console.log("[wp-booking] FALLBACK al primo form disponibile (nessun generico trovato)");
                selectedForm = { ...bookingForms[0] };
                selectedForm.hiddenFields = { ...bookingForms[0].hiddenFields };
            }

            // INIEZIONE CHIAVE: Forziamo la prenotazione di QUESTA stanza
            const detailKey = `mphb_rooms_details[${roomTypeId}]`;
            selectedForm.hiddenFields[detailKey] = "1";
            console.log(`[wp-booking] Iniettato campo: ${detailKey} = 1`);
        }



        return NextResponse.json({
            step: 2,
            bookingForm: selectedForm,
            allBookingForms: bookingForms,
            slug
        });

    } catch (error) {
        console.error("[wp-booking] Errore:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
