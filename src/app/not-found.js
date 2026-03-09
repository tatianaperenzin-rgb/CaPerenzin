

import "@/app/globals.css"
import { getDictionary } from "@/lib/dictionary"
import BubbleFrame from "@/components/ui/bubbleFrame"
import localFont from "next/font/local"
import BtnBase from "@/components/ui/btnBase"

// Configurazione Font PPMonumentExtended
const PPMonumentExtended = localFont({
    src: [
        { path: './fonts/PPMonumentExtended-Thin.woff2', weight: '100', style: 'normal' },
        { path: './fonts/PPMonumentExtended-ThinItalic.woff2', weight: '100', style: 'italic' },
        { path: './fonts/PPMonumentExtended-Light.woff2', weight: '300', style: 'normal' },
        { path: './fonts/PPMonumentExtended-LightItalic.woff2', weight: '300', style: 'italic' },
        { path: './fonts/PPMonumentExtended-Regular.woff2', weight: '400', style: 'normal' },
        { path: './fonts/PPMonumentExtended-RegularItalic.woff2', weight: '400', style: 'italic' },
        { path: './fonts/PPMonumentExtended-Bold.woff2', weight: '700', style: 'normal' },
        { path: './fonts/PPMonumentExtended-BoldItalic.woff2', weight: '700', style: 'italic' },
        { path: './fonts/PPMonumentExtended-Black.woff2', weight: '900', style: 'normal' },
        { path: './fonts/PPMonumentExtended-BlackItalic.woff2', weight: '900', style: 'italic' },
    ],
    variable: '--font-PPMonumentExtended',
    display: 'swap',
})



export const metadata = {
    title: "404 - Pagina non trovata | Ca'Perenzin",
    description: "Sembra che tu abbia bussato alla porta sbagliata...",
    robots: {
        index: false,
        follow: false,
    },
}

export default async function NotFound({ params }) {

    // Fallback su 'it' se params o lang non esistono (per 404 globali)
    const lang = (await params)?.lang || 'it'
    const dictionary = await getDictionary(lang)

    return (
        <html lang={lang}>
            <body className={`${PPMonumentExtended.className} font-sans antialiased bg-black text-white`}>
                <div className="flex w-full h-dvh relative p-3 lg:p-0">
                    <BubbleFrame className="h-full w-full" color="bg-transparent border-2 border-gold">
                        {/* Contenuto 404 qui */}
                        <div className="flex flex-col items-center justify-center h-full w-full select-none text-center px-4">
                            <h1 className="font-black text-8xl md:text-9xl lg:text-[220px]  text-foregound opacity-80 leading-none">404</h1>
                            <p className="font-black text-4xl  md:text-7xl lg:text-8xl text-gold">Ca'Perenzin</p>

                            {/* Testo Simpatico */}
                            <p className="text-xs xs:text-sm md:text-xl font-light text-white/80 mt-8 max-w-3xl text-balance">
                                {dictionary.assetUi.notFoundText}
                            </p>

                            <BtnBase
                                as="a"
                                href="/"
                                className="bg-gold mt-12 hover:scale-105 transition-transform duration-300"
                                textClassName=""
                            >
                                {dictionary.assetUi.goHome}
                            </BtnBase>


                        </div>
                    </BubbleFrame>
                </div>
            </body>
        </html>
    )
}
