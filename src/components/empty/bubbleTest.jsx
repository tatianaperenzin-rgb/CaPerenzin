"use client";


import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, useSpring, motion, useMotionValueEvent, useInView } from "framer-motion";
import SectionC from "@/components/home/sectionC";
import SectionD from "../home/sectionD";
import RoomCarosel from "@/components/ui/roomCarousel/roomCarosel"
import BtnBase from "../ui/btnBase"
import BookingNav from "../ui/booking/bookingNav";
import { useUI } from "@/hooks/contexUi"

export default function BubbleTest({ dictionary, lang }) {

    const [visible, setVisible] = useState(false)
    const { bubbleTest, setBubbleTest } = useUI()
    // --- CONFIGURAZIONE SCROLL E ANIMAZIONE ---

    // 1. OFFSET DI SCROLL
    // Definisce l'intervallo di tracciamento dello scroll.
    // ["start end", "start start"] significa:
    // - INIZIO (progress 0): Quando la cima (start) della 'nextSectionRef' entra dal fondo (end) della viewport.
    // - FINE (progress 1): Quando la cima (start) della 'nextSectionRef' raggiunge la cima (start) della viewport.
    // Puoi modificarlo es: ["start 90%", "start top"] per ritardare o anticipare.
    const SCROLL_OFFSET = ["start end", "start start"];

    // 2. PUNTO DI CHIUSURA ANIMAZIONE (0.0 - 1.0)
    // Definisce a che punto dello scroll il box bianco deve essere completamente chiuso (altezza 0).
    // 0.7 significa che l'animazione finisce al 70% del percorso, lasciando un 30% di "respiro" 
    // prima che la sezione successiva arrivi in cima.
    const CLOSING_THRESHOLD = 0.7;

    // 3. CONFIGURAZIONE MOLLA (SPRING)
    // Controlla la "fisica" dell'animazione.
    const SPRING_CONFIG = {
        stiffness: 200, // Rigidità: valori alti (es. 300-500) = risposta rapida/scattante. Valori bassi (es. 50-100) = lento/morbido.
        damping: 30,    // Smorzamento: evita che l'animazione "rimbalzi" troppo alla fine.
        restDelta: 0.001 // Precisione per considerare l'animazione ferma.
    };


    // 1. Creiamo un riferimento alla sezione che "arriva da sotto"
    const nextSectionRef = useRef(null);

    // 2. Tracciamo lo scroll relativo alla sezione successiva usando i parametri
    const { scrollYProgress } = useScroll({
        target: nextSectionRef,
        offset: SCROLL_OFFSET,
    });

    // Aggiungiamo una 'molla' (spring) allo scroll per renderlo fluido e reattivo
    const smoothProgress = useSpring(scrollYProgress, SPRING_CONFIG);

    // TRIGGER VISIBILITÀ: Quando lo scroll supera 0.9 (90%), mostriamo la sezione
    useMotionValueEvent(smoothProgress, "change", (latest) => {
        if (latest > 0.7 && !visible) {
            setVisible(true);
        } else if (latest <= 0.7 && visible) {
            setVisible(false);
        }
    });

    // 3. Trasformiamo lo scroll (0 -> 1) in altezza (100% -> 0%)
    // Usiamo la soglia definita (CLOSING_THRESHOLD) per l'uscita anticipata
    const height = useTransform(smoothProgress, [0, CLOSING_THRESHOLD], ["100%", "20%"]);

    // Opzionale: sfumiamo anche l'opacità sincronizzata con l'altezza
    const opacity = useTransform(smoothProgress, [0, CLOSING_THRESHOLD], [1, 0.1]);

    // --- VISIBILITÀ PER NAVBAR ---
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { margin: "0px" })

    useEffect(() => {
        setBubbleTest(isInView)
    }, [isInView, setBubbleTest])

    return (
        <main ref={containerRef} className="relative w-full">


            {/* --- SEZIONE 2: Il Blocco Colorato (Sticky Container) --- */}
            {/* Usiamo un container sticky che occupa tutto lo schermo */}
            <div className="h-[110vh] sticky top-0 overflow-hidden z-0">
                {/* Questo è il blocco che verrà animato */}
                {/* Contenitore interno fisso - Allineato in alto (items-start) */}
                <div className="w-full h-screen absolute top-0 left-0 flex items-start justify-center">

                    {/* Rettangolo con bordi arrotondati che si chiude in altezza */}
                    <motion.div
                        style={{
                            height,  // L'altezza del box bianco cambia (dal basso verso l'alto grazie a items-start)
                            opacity
                        }}
                        className="w-full rounded-3xl xl:rounded-[40px] shadow-2xl overflow-hidden relative"
                    >
                        {/* Contenuto del box che rimane fisso. 
                                     Usiamo un'altezza fissa calcolata (100vh - padding verticale) 
                                     perché l'altezza del genitore cambia. */}
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center">
                            <div className={`flex flex-col w-full h-full  pb-5 lg:pb-0 gap-2 !pb-0
                                                     `}>
                                <RoomCarosel
                                    roomImage={""}
                                    dictionary={dictionary}
                                    lang={lang} />


                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>



            {/* --- SEZIONE 3: La Nuova Sezione (Trigger) --- */}
            {/* Deve avere uno z-index superiore per coprire o interagire visivamente */}
            <section
                ref={nextSectionRef}
                className="relative z-10 h-[130vh] 
                           mt-0 xs:mt-10 "
            >
                {/* BACKGROUND che appare/scompare */}
                <div
                    className={`
                    absolute inset-0 w-full h-full bg-background
                    transition-opacity duration-[2000ms] ease-in-out
                    ${visible ? "opacity-100" : "opacity-0"}
                `} />

                {/* CONTENUTO (SectionD) che resta sempre visibile */}
                <div className="relative z-10 sticky top-0">
                    <SectionD dictionary={dictionary} lang={lang} />
                </div>

            </section>

        </main>
    );
}