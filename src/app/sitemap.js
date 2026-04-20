import { getDictionary } from '@/lib/dictionary';

export default async function sitemap() {
  const baseUrl = 'https://caperenzin.it';

  // Fetch the italian dictionary to extract dynamic values like room slugs
  const dictionaryIt = await getDictionary('it');
  
  // Available languages
  const languages = ['it', 'en'];

  // Define your static routes mapped in your app folder
  const staticRoutes = [
    '',              // Home
    '/experiences',  // Experiences Page
    '/contatti',     // Contact Page
    '/booking'       // Booking Page
  ];

  const sitemapUrls = [];

  // Iterate over languages and generate corresponding permalinks
  for (const lang of languages) {
      // Setup static route pages
      for (const route of staticRoutes) {
          sitemapUrls.push({
              url: `${baseUrl}/${lang}${route}`,
              lastModified: new Date(),
              changeFrequency: route === '' ? 'weekly' : 'monthly',
              priority: route === '' ? 1.0 : 0.8,
          });
      }

      // Loop through dataRooms from JSON to get dynamic room pages
      if (dictionaryIt && dictionaryIt.dataRooms) {
          dictionaryIt.dataRooms.forEach((room) => {
              sitemapUrls.push({
                  url: `${baseUrl}/${lang}/camere/${room.slug}`,
                  lastModified: new Date(),
                  changeFrequency: 'monthly',
                  priority: 0.9,
              });
          });
      }
  }

  return sitemapUrls;
}
