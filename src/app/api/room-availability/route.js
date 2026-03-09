
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const icsUrl = searchParams.get('icsUrl');

    if (!icsUrl) {
        return NextResponse.json({ error: 'ICS URL required' }, { status: 400 });
    }

    try {
        const response = await fetch(icsUrl, {
            next: { revalidate: 60 },
            cache: 'no-store'
        });

        if (!response.ok) {
            console.error(`Status: ${response.status}`);
            return NextResponse.json({ bookedDates: [] });
        }

        const icsText = await response.text();
        const bookedDates = parseIcsToDates(icsText);

        return NextResponse.json({ bookedDates });
    } catch (error) {
        console.error('Error fetching ICS:', error);
        return NextResponse.json({ bookedDates: [] });
    }
}

function parseIcsToDates(icsText) {
    const dates = [];
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
                // Espandiamo l'intervallo di date (dal giorno X al giorno Y) in una lista di giorni singoli
                const eventDates = getDatesInRange(currentEvent.start, currentEvent.end);
                dates.push(...eventDates);
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

    return dates;
}

function getDatesInRange(startDate, endDate) {
    const date = new Date(startDate.getTime());
    const dates = [];

    // Escludiamo la data di checkout perché solitamente quel giorno la stanza viene liberata ed è prenotabile da un altro
    while (date < endDate) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    return dates;
}

function parseIcsDate(line) {
    const parts = line.split(':');
    if (parts.length < 2) return null;

    const value = parts[1];
    if (value.length === 8 && !value.includes('T')) {
        const y = parseInt(value.substring(0, 4), 10);
        const m = parseInt(value.substring(4, 6), 10) - 1;
        const d = parseInt(value.substring(6, 8), 10);
        return new Date(y, m, d);
    }
    if (value.includes('T')) {
        const clean = value.replace('Z', '').replace(/-/g, '').replace(/:/g, '');
        const y = parseInt(clean.substring(0, 4), 10);
        const m = parseInt(clean.substring(4, 6), 10) - 1;
        const d = parseInt(clean.substring(6, 8), 10);
        return new Date(y, m, d);
    }
    return null;
}
