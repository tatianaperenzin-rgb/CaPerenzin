"use client"

import { cn } from "@/lib/utility"
import { useState, useEffect, useRef } from "react"
import MasterTitle from "@/components/ui/typography/masterTitle"
import MeteoControl from "@/components/ui/meteo/meteoControl"
import BtnBase from "@/components/ui/btnBase" // Importa BtnBase per il tasto "Chiudi"

// Componenti Viste
import Star from "@/components/ui/meteo/star"
import Rain from "@/components/ui/meteo/rain"
import Moon from "@/components/ui/meteo/moon"
import MeteoSingleView from "@/components/ui/meteo/meteoSingleView"
import { BsXLg } from "react-icons/bs" // Icona per chiudere


export default function SectionD({ dictionary, lang, className }) {

    const [activeId, setActiveId] = useState(null)

    const sectionRef = useRef(null)

    // Definiamo le viste
    const dataMeteoViews = {
        1: {
            id: 1,
            headline: dictionary.meteoView.star.headline,
            content: dictionary.meteoView.star.content,
            src: dictionary.meteoView.star.srcVideo
        },
        2: {
            id: 2,
            headline: dictionary.meteoView.moon.headline,
            content: dictionary.meteoView.moon.content,
            src: dictionary.meteoView.moon.srcVideo
        },
        3: {
            id: 3,
            headline: dictionary.meteoView.rain.headline,
            content: dictionary.meteoView.rain.content,
            src: dictionary.meteoView.rain.srcVideo
        }
    }

    // --- 1. RESET AUTOMATICO ALLO SCROLL (NEW) ---
    useEffect(() => {
        const element = sectionRef.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    setActiveId(null)
                }
            },
            {
                threshold: 0,
                // Restringiamo l'area di "osservazione" al centro dello schermo (lasciando solo il 10% centrale attivo).
                // Appena l'elemento esce da questa striscia centrale (scrollando su o giù), si resetta.
                // Risolve il problema del reset "verso il basso".
                rootMargin: "-35% 0px -35% 0px"
            }
        )

        observer.observe(element)

        return () => observer.disconnect() // Pulizia quando smonti il componente
    }, [])


    // --- 2. AUTO-CENTER (Quello di prima) ---
    useEffect(() => {
        if (activeId && sectionRef.current) {
            // Piccolo timeout per dare tempo al layout di cambiare prima di scrollare
            setTimeout(() => {
                sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }, 100)
        }
    }, [activeId])


    // FIX: Qui passiamo 'id' come argomento e settiamo QUELLO
    const handleClick = (id) => {
        setActiveId(id)
        console.log("Apro vista:", id)
    }

    // Seleziono i dati giusti in base al click
    const currentData = dataMeteoViews[activeId]


    return (
        <section ref={sectionRef} className={cn(`relative flex flex-col w-full h-dvh lg:h-dvh
                            justify-center items-center overflow-hidden
                            ${className}`)}>

            {/* LOGICA DI SCAMBIO VISTA */}
            {!activeId ? (
                // =================================================
                //  VISTA ZERO (MENU) - Se activeId è NULL
                // =================================================
                <div className="flex flex-col w-full h-full justify-center 
                                px-10 xs:px-14 md:px-20 lg:px-30 2xl:px-50
                                gap-40 animate-fade-in">

                    {/* BLOCK HEADLINE */}
                    <div className="flex flex-col gap-7">
                        <div className="flex">
                            <MasterTitle className="2xl:text-8xl" tag="h2">
                                {dictionary.headlineD}
                            </MasterTitle>
                        </div>
                        <p className="text-xs

                                    xs:text-sm md:text-lg
                                    it:w-62 it:xs:w-65 it:md:w-xl
                                    en:w-xs en:md:w-2xl">
                            {dictionary.subHeadlineD}
                        </p>
                    </div>

                    {/* BLOCK CTA + BTN */}
                    <MeteoControl
                        className=""
                        dictionary={dictionary}
                        lang={lang}
                        onChange={handleClick}
                        activeId={activeId}
                    />

                    {/* NOTE (Visibile solo nel menu) */}
                    <p className="flex items-center text-center absolute bottom-5 left-0 w-full justify-center
                                  text-[9px] xs:text-[12px] md:text-xs px-15 text-gold opacity-50">
                        {dictionary.noteD}
                    </p>
                </div>

            ) : (
                // VISTA SINGOLA (Usiamo i dati mappati sopra)
                <div key={activeId} className="w-full h-dvh animate-fade-in">

                    <MeteoSingleView
                        data={currentData}
                        dictionary={dictionary}
                        lang={lang}
                        onChange={handleClick}
                        activeId={activeId}
                    />


                </div>
            )}

        </section>
    )
}