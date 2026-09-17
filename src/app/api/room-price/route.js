import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get('id'); // accommodation_type_id numerico (es. 17, 20, 22, 24)

    const ck = process.env.MOTOPRESS_CK;
    const cs = process.env.MOTOPRESS_CS;

    try {
        // Le consumer key/secret vanno passate come query params, NON come Basic Auth
        const baseUrl = process.env.NEXT_PUBLIC_WP_URL || 'https://admin.caperenzin.it';
        const apiUrl = `${baseUrl}/wp-json/mphb/v1/rates?consumer_key=${ck}&consumer_secret=${cs}`;

        const res = await fetch(apiUrl, {
            cache: 'no-store' // Prezzi sempre aggiornati
        });


        if (!res.ok) {
            const errorText = await res.text();
            console.error("[room-price] Errore API:", errorText);
            return NextResponse.json({ error: 'Errore API', details: errorText }, { status: res.status });
        }

        const rates = await res.json();

        // Cerchiamo la tariffa filtrando per l'ID del tipo di alloggio
        const matchingRate = rates.find(rate =>
            String(rate.accommodation_type_id) === String(roomId)
        );


        let price = null;
        if (matchingRate && matchingRate.season_prices && matchingRate.season_prices.length > 0) {
            price = matchingRate.season_prices[0].base_price;
        }

        return NextResponse.json({ price });
    } catch (error) {
        console.error("[room-price] Errore:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}