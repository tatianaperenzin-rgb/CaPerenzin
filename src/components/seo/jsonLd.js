export function getOrganizationSchema(dictionary, lang) {
    if (!dictionary) return null;

    const seoData = dictionary.sectionO || {};
    const heroData = dictionary.hero || {};

    const baseDescription = heroData.heroIntroTwo || heroData.heroIntroOne || "Luxury Stay in Tarzo, Treviso";
    const localizedDescription = lang === 'it' 
        ? `${baseDescription} Esclusivo B&B e alloggio di lusso tra Tarzo e Conegliano. Scopri un'oasi di puro relax, comfort e calma.`
        : `${baseDescription} Exclusive luxury B&B and accommodation near Tarzo and Conegliano. Discover an oasis of pure relax, comfort, and calmness.`;

    return {
        "@context": "https://schema.org",
        "@type": ["Organization", "BedAndBreakfast", "LodgingBusiness"],
        "name": seoData.headline || "Ca'Perenzin",
        "description": localizedDescription,
        "url": `https://caperenzin.it/${lang}`,
        "logo": "https://res.cloudinary.com/dp1xgwqau/image/upload/v1766344542/madness_of_art_Cinematic_wide_shot_interior_looking_out_from__7cbe6a9f-3f9e-419f-936e-80959b105f6d_1_fmsrhc.png",
        "image": [
            heroData.srcDesk || "https://res.cloudinary.com/de124cxny/image/upload/v1771152468/caperenzin.home.desk_rqefja.jpg"
        ],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": seoData.adress ? seoData.adress.split(',')[0].trim() : "Località Rive di S. Pietro, 10",
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
        "telephone": seoData.cell || "+393333597947",
        "email": seoData.mail || "info@caperenzin.it",
        "sameAs": [
            seoData.urlIG || "https://www.instagram.com/caperenzin",
            seoData.urlFB || "https://www.facebook.com/people/Caperenzin/61577528301835/"
        ],
        "priceRange": "$$",
        "vatID": seoData.pIva ? seoData.pIva.replace('P.iva ', '') : "04668120266",
        "areaServed": [
            {
                "@type": "City",
                "name": "Conegliano"
            },
            {
                "@type": "City",
                "name": "Tarzo"
            },
            {
                "@type": "City",
                "name": "Treviso",
                "sameAs": "https://it.wikipedia.org/wiki/Colline_del_Prosecco_di_Conegliano_e_Valdobbiadene"
            }
        ],
        "keywords": lang === 'it' 
            ? "B&B Conegliano, B&B Tarzo, alloggio Conegliano, relax, comfort, luxury, calma, Colline del Prosecco, natura" 
            : "B&B Conegliano, B&B Tarzo, accommodation Conegliano, relax, comfort, luxury, calm, Prosecco Hills, nature",
        "slogan": lang === 'it' 
            ? "Il B&B di lusso per il tuo relax e comfort tra Tarzo e Conegliano" 
            : "The luxury B&B for your relax and comfort between Tarzo and Conegliano",
        "hasMap": "https://www.google.com/maps/dir/?api=1&destination=Località+Rive+di+S.+Pietro,+10,+31020+Tarzo+TV",
        "amenityFeature": [
            {
                "@type": "LocationFeatureSpecification",
                "name": "Relax",
                "value": true
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": "Luxury Comfort",
                "value": true
            },
             {
                "@type": "LocationFeatureSpecification",
                "name": "Nature & Calm",
                "value": true
            }
        ]
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
