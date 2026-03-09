"use client"
import { useRef, useMemo } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

export default function TextReveal({ children, className }) {
    const container = useRef(null)

    // OTTIMIZZAZIONE 1: Memorizziamo l'array delle parole per non ricalcolarlo ad ogni frame di scroll
    const words = useMemo(() => {
        let text = children

        // Se il children è un elemento (es. <p>), prendiamo il suo contenuto
        if (typeof text === "object" && text?.props?.children) {
            text = text.props.children
        }

        if (typeof text === "string") return text.split(" ")
        return []
    }, [children])

    const { scrollYProgress } = useScroll({
        target: container,
        // Offset leggermente anticipato per garantire che l'animazione inizi fluidamente
        offset: ["start 0.9", "end 0.6"]
    })

    // OTTIMIZZAZIONE 2: Spring più rigido per evitare l'effetto "elastico ritardato" che sembra uno scatto
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 200, // Molto più reattivo (era 70)
        damping: 40,    // Smorza velocemente
        restDelta: 0.003
    })

    return (
        <p
            ref={container}
            // Rimosso 'will-change-transform' dal container padre (meglio sui figli)
            className={`flex flex-wrap leading-tight ${className}`}
        >
            {/* OTTIMIZZAZIONE 3: Rimosso isMounted. Il testo renderizza subito occupando spazio, niente Layout Shift */}
            {words.map((word, i) => {
                // Calcolo matematico per scaglionare l'animazione
                const start = i / words.length
                const end = start + (1 / words.length)

                return (
                    <Word key={i} progress={smoothProgress} range={[start, end]}>
                        {word}
                    </Word>
                )
            })}
        </p>
    )
}

const Word = ({ children, progress, range }) => {
    // OTTIMIZZAZIONE 4: Usiamo solo Opacity.
    // Animare la 'y' (traslazione) su testi piccoli durante lo scroll spesso crea 
    // problemi di "sub-pixel rendering" che fanno sembrare il testo tremolante.
    const opacity = useTransform(progress, range, [0.1, 1])

    return (
        <span className="relative mr-2 lg:mr-3 mt-1 lg:mt-2 h-fit xs:py-1 xs:px-[1px]">
            {/* Testo Ombra (Statico) - Mantiene lo spazio e dà l'effetto "non attivo" */}
            <span className="absolute text-gold opacity-10 select-none pointer-events-none">
                {children}
            </span>

            {/* Testo Animato (Overlay) */}
            <motion.span
                style={{ opacity }}
                className="relative inline-block text-current will-change-opacity" // Assicurati del colore del testo attivo
            >
                {children}
            </motion.span>
        </span>
    )
}