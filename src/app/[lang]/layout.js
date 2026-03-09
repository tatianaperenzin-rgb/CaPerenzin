
import "@/app/globals.css"
import localFont from "next/font/local"
import { getDictionary } from "@/lib/dictionary";
import TermlyCMP from "@/components/termlyCMP";
import { Suspense } from "react";
import NavBar from "@/components/ui/navbar";
import { ContextUi } from "@/hooks/contexUi";
import { BookingProvider } from "@/hooks/bookingContext";
import StructuredData from "@/components/seo/StructuredData";

const PPMonumentExtended = localFont({
  src: [
    // --- THIN (100) ---
    {
      path: './../fonts/PPMonumentExtended-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: './../fonts/PPMonumentExtended-ThinItalic.woff2',
      weight: '100',
      style: 'italic',
    },

    // --- LIGHT (300) ---
    {
      path: './../fonts/PPMonumentExtended-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './../fonts/PPMonumentExtended-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },

    // --- REGULAR (400) ---
    {
      path: './../fonts/PPMonumentExtended-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './../fonts/PPMonumentExtended-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },

    // --- BOLD (700) ---
    {
      path: './../fonts/PPMonumentExtended-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './../fonts/PPMonumentExtended-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },

    // --- BLACK (900) ---
    {
      path: './../fonts/PPMonumentExtended-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: './../fonts/PPMonumentExtended-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-PPMonumentExtended',
  display: 'swap',
})

const MullerNext = localFont({
  src: [
    // --- REGULAR (400) ---
    {
      path: './../fonts/MullerNextTrial-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-MullerNext',
  display: 'swap'
})

export async function generateMetadata({ params }) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return {
    title: {
      default: dictionary.hero.BeBname,
      template: `%s | ${dictionary.hero.BeBname}`,
    },
    description: dictionary.hero.heroIntroOne,
    keywords: ['B&B', 'Veneto', 'Luxury', 'Nature', 'Travel', "Ca'Perenzin", 'Tarzo', 'Prosecco Hills'],
    metadataBase: new URL('https://caperenzin.it'),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'it': '/it',
        'en': '/en',
      },
    },
    openGraph: {
      title: dictionary.hero.BeBname,
      description: dictionary.hero.heroIntroOne,
      url: `https://caperenzin.it/${lang}`,
      siteName: "Ca'Perenzin",
      images: [
        {
          url: 'https://res.cloudinary.com/dp1xgwqau/image/upload/v1766344542/madness_of_art_Cinematic_wide_shot_interior_looking_out_from__7cbe6a9f-3f9e-419f-936e-80959b105f6d_1_fmsrhc.png',
          width: 1200,
          height: 630,
        },
      ],
      locale: lang === 'it' ? 'it_IT' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: dictionary.hero.BeBname,
      description: dictionary.hero.heroIntroOne,
      images: ['https://res.cloudinary.com/dp1xgwqau/image/upload/v1766344542/madness_of_art_Cinematic_wide_shot_interior_looking_out_from__7cbe6a9f-3f9e-419f-936e-80959b105f6d_1_fmsrhc.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function RootLayout({ children, params }) {

  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return (
    <html lang={lang}>

      <body
        suppressHydrationWarning={true}
        className={`${PPMonumentExtended.className} ${MullerNext.variable} font-sans antialiased `}
      >
        <StructuredData description={dictionary.hero.heroIntroOne} />

        <ContextUi>
          <BookingProvider>
            <NavBar dictionary={dictionary} lang={lang} />

            <main className="relative w-full min-h-screen flex flex-col">
              {children}
            </main>

          </BookingProvider>
        </ContextUi>

        <Suspense fallback={null}>
          <TermlyCMP websiteUUID="4b2d235a-874a-4e4c-be8e-cb22a88c512a" autoBlock={true} />
        </Suspense>

      </body >
    </html >
  );
}
