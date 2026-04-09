export function getBaseSchema(dictionary, lang) {
    return {
        "@context": "https://schema.org",
        "@type": "BedAndBreakfast",
        "name": "Ca'Perenzin",
        "description": dictionary?.hero?.heroIntroOne || "Luxury Stay in Tarzo, Treviso",
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
        "url": `https://caperenzin.it/${lang}`,
        "telephone": "+393333597947",
        "priceRange": "$$"
    };
}

export function getRoomSchema(dataRoom, lang) {
    if (!dataRoom) return null;
    return {
        "@context": "https://schema.org",
        "@type": "HotelRoom",
        "name": dataRoom.roomName,
        "description": dataRoom.description,
        "image": dataRoom.gallery && dataRoom.gallery[0] ? [dataRoom.gallery[0].bkDesk] : [],
        "url": `https://caperenzin.it/${lang}/camere/${dataRoom.slug}`,
        "bed": {
            "@type": "BedDetails",
            "typeOfBed": "Double",
            "numberOfBeds": "1"
        },
        "occupancy": {
            "@type": "QuantitativeValue",
            "value": 2
        }
    };
}

export function getExperienceSchema(exp, lang) {
    if (!exp || !exp.buttons) return null;
    let allExperiences = [];
    exp.buttons.forEach(button => {
        if (button.experience) {
            allExperiences = allExperiences.concat(button.experience);
        }
    });

    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": allExperiences.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "TouristAttraction",
                "name": item.headline,
                "description": item.content,
                "image": item.srcDesk ? [item.srcDesk] : []
            }
        }))
    };
}
