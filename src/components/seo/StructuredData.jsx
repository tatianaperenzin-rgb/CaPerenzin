import Script from 'next/script';

export default function StructuredData({ headline, description, datePublished, author }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BedAndBreakfast",
        "name": "Ca'Perenzin",
        "description": description || "Luxury Stay in Tarzo, Treviso",
        "image": [
            "https://res.cloudinary.com/dp1xgwqau/image/upload/v1766344542/madness_of_art_Cinematic_wide_shot_interior_looking_out_from__7cbe6a9f-3f9e-419f-936e-80959b105f6d_1_fmsrhc.png"
        ],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Località Rive di S. Pietro, 10",
            "addressLocality": "Tarzo",
            "addressRegion": "TV",
            "postalCode": "31020",
            "addressCountry": "IT"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 45.9616013,
            "longitude": 12.2343806
        },
        "url": "https://caperenzin.it",
        "telephone": "+393333597947",
        "priceRange": "$$"
    };

    return (
        <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
