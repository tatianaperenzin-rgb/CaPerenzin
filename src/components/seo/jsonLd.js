export function getOrganizationSchema(dictionary, lang) {
  if (!dictionary) return null;

  const seoData = dictionary.sectionO || {};
  const heroData = dictionary.hero || {};

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "BedAndBreakfast"],
    name: seoData.headline || "Ca'Perenzin | B&B Tarzo",
    description:
      heroData.heroIntroTwo ||
      heroData.heroIntroOne ||
      "Luxury Stay in Tarzo, Treviso",
    url: `https://caperenzin.it/${lang}`,
    logo: "https://res.cloudinary.com/de124cxny/image/upload/v1771152468/caperenzin.home.desk_rqefja.jpg",
    image: [
      heroData.srcDesk ||
        "https://res.cloudinary.com/de124cxny/image/upload/v1771152468/caperenzin.home.desk_rqefja.jpg",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: seoData.adress
        ? seoData.adress.split(",")[0].trim()
        : "Località Rive di S. Pietro, 10",
      addressLocality: "Tarzo",
      addressRegion: "TV",
      postalCode: "31020",
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.9616013,
      longitude: 12.2343806,
    },
    telephone: seoData.cell || "+393333597947",
    email: seoData.mail || "info@caperenzin.it",
    sameAs: [
      seoData.urlIG || "https://www.instagram.com/caperenzin",
      seoData.urlFB ||
        "https://www.facebook.com/people/Caperenzin/61577528301835/",
    ],
    priceRange: "$$",
    vatID: seoData.pIva ? seoData.pIva.replace("P.iva ", "") : "04668120266",
  };
}

export function getRoomSchema(dataRoom, lang) {
  if (!dataRoom) return null;
  return {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: dataRoom.roomName,
    description: dataRoom.description,
    image:
      dataRoom.gallery && dataRoom.gallery[0]
        ? [dataRoom.gallery[0].bkDesk]
        : [],
    url: `https://caperenzin.it/${lang}/camere/${dataRoom.slug}`,
    bed: {
      "@type": "BedDetails",
      typeOfBed: "Double",
      numberOfBeds: "1",
    },
    occupancy: {
      "@type": "QuantitativeValue",
      value: 2,
    },
  };
}

export function getExperienceSchema(exp, lang) {
  if (!exp || !exp.buttons) return null;
  let allExperiences = [];
  exp.buttons.forEach((button) => {
    if (button.experience) {
      allExperiences = allExperiences.concat(button.experience);
    }
  });

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: allExperiences.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "TouristAttraction",
        name: item.headline,
        description: item.content,
        image: item.srcDesk ? [item.srcDesk] : [],
      },
    })),
  };
}
