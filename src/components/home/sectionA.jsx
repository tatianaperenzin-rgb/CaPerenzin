"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BsArrowDownRightCircle } from "react-icons/bs"

// Assicurati che i percorsi di import siano corretti nel tuo progetto
import MasterTitle from "@/components/ui/typography/masterTitle"
import BtnBase from "@/components/ui/btnBase"
import PopUpA from "@/components/ui/popUp/popUpA"

export default function SectionA({ dictionary, lang }) {
    const [popOpen, setPopOpen] = useState(false)

    // REF: Serve per capire quale sezione centrare nello schermo
    const sectionRef = useRef(null)
    // REF: Serve per capire se clicchi dentro o fuori il box bianco
    const contentRef = useRef(null)

    const handleOpenPop = () => {
        setPopOpen((prev) => !prev) // Best practice: usare callback per lo stato precedente
    }

    // EFFETTO 1: Scroll into view e Blocco scroll del body
    useEffect(() => {
        if (popOpen) {
            // Centra la sezione
            setTimeout(() => {
                sectionRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Cambiato da 'center' a 'start' per coprire tutto il viewport con h-dvh
                })
            }, 100) // Piccolo ritardo per dare tempo al DOM di aggiornarsi con la nuova altezza

            // Blocca lo scroll solo su mobile (< 1024px)
            if (window.innerWidth < 1024) {
                document.body.style.overflow = 'hidden'
            }
        } else {
            // Ripristina lo scroll
            document.body.style.overflow = ''
        }

        // Cleanup: Sblocca sempre se il componente viene smontato
        return () => {
            document.body.style.overflow = ''
        }
    }, [popOpen])

    // EFFETTO 2: Gestione Click Outside (Chiusura al click fuori)
    useEffect(() => {
        if (!popOpen) return
        const closePop = () => setPopOpen(false)

        const handleCloseOutside = (e) => {
            // Se clicchi dentro il contenuto, non fare nulla
            if (contentRef.current && contentRef.current.contains(e.target)) {
                return
            }
            // Altrimenti chiudi
            setPopOpen(false)
        }

        const handleWheel = (e) => {
            // TRUCCO TOUCHPAD: 
            // Ignoriamo micro-movimenti (es. deltaY < 15) che capitano appena appoggi le dita.
            // Se lo scroll è deciso (> 15), chiudiamo.
            if (Math.abs(e.deltaY) > 15) {
                closePop()
            }
        }

        // 3. TASTIERA (Frecce, Spazio, PageDown)
        const handleKeydown = (e) => {
            if (["ArrowDown", "ArrowUp", "Space", "PageDown", "PageUp"].includes(e.code)) {
                closePop()
            }
        }

        // Aggiungi listener (mousedown è più reattivo di click)
        document.addEventListener("mousedown", handleCloseOutside)
        document.addEventListener("touchstart", handleCloseOutside)

        // È raro dover ascoltare 'touchmove' o 'scroll' per chiudere un popup, 
        // spesso causa chiusure accidentali mentre si scrolla la pagina.
        // Se vuoi chiudere allo scroll, decommenta la riga sotto:
        // window.addEventListener("scroll", () => setPopOpen(false))

        // 3. IL TRUCCO PER LO SCROLL SU DESK:
        // Aggiungiamo il listener dello scroll con un ritardo.
        // Perché? Perché appena apri il popup, il codice fa uno scroll automatico (scrollIntoView).
        // Senza il ritardo, quel movimento automatico chiuderebbe subito il popup!
        const timer = setTimeout(() => {
            // Usa { passive: false } per intercettare meglio su alcuni browser, 
            // ma qui passive: true va bene per le performance.
            window.addEventListener("wheel", handleWheel, { passive: true })
            window.addEventListener("keydown", handleKeydown)
            window.addEventListener("scroll", closePop) // Fallback se la pagina si muove davvero
        }, 500)

        // CLEANUP TOTALE
        return () => {
            clearTimeout(timer)
            document.removeEventListener("mousedown", handleCloseOutside)
            document.removeEventListener("touchstart", handleCloseOutside)
            window.removeEventListener("wheel", handleWheel)
            window.removeEventListener("keydown", handleKeydown)
            window.removeEventListener("scroll", closePop)
        }
    }, [popOpen])

    return (
        <section
            ref={sectionRef}
            className={`
                relative flex w-full lg:h-dvh justify-center items-center overflow-x-hidden z-10
                pointer-events-none transition-all duration-500 scroll-mt-0
                ${popOpen ? "h-dvh" : "h-170 xs:h-190 md:h-200 lg:h-dvh"}
            `}
        >
            <div className="flex flex-col  gap-5 md:gap-20 ">

                <motion.div
                    className={`duration-500 ${popOpen ? "mb-80 xs:mb-100 lg:mb-0 -translate-y-0 xs:-translate-10 lg:-translate-x-55 xl:-translate-x-80" : "mb-0"}`}
                    animate={{
                        scale: popOpen ? 0.9 : 1,
                        y: popOpen ? -20 : 0,
                        x: popOpen ? -5 : 0,
                        opacity: popOpen ? 0.2 : 1
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                >
                    <MasterTitle className="w-min" tag="h2">
                        {lang === "it"
                            ? dictionary.hedlineA.replace("Lascia il", "Lascia\u00A0il")
                            : dictionary.hedlineA.replace("Leave the", "Leave\u00A0the")
                        }
                    </MasterTitle>
                </motion.div>

                {!popOpen ? (
                    <BtnBase
                        textClassName=""
                        className="flex w-fit pointer-events-auto bg-gold hover:scale-105 transition-all duration-800"
                        iconEnd={BsArrowDownRightCircle}
                        iconClassName="text-current"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleOpenPop()
                        }}
                    >
                        {dictionary.btnA}
                    </BtnBase>
                ) : (
                    <AnimatePresence>
                        {popOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="fixed inset-0 z-50 pointer-events-auto" // Aggiunto pointer-events-auto qui
                            >
                                <PopUpA
                                    className={`
                                        fixed inset-0 w-full h-svh lg:h-dvh bg-black/50 
                                        lg:absolute z-50 top-0 left-0 flex items-center
                                        justify-center xl:justify-end
                                        bg-transparent pt-70 lg:p-0
                                        lg:ms-80 xl:ms-11
                                    `}
                                >
                                    <div
                                        ref={contentRef}
                                        className={`
                                            flex flex-col h-fit border-2 border-gold rounded-4xl
                                            xl:me-80 w-70  xs:w-95 md:w-130 it:lg:w-80 en:lg:w-90 
                                            p-5 xs:p-7 gap-15
                                        `}
                                    >
                                        <p className="font-muller text-balance text-sm xs:text-base">
                                            {dictionary.textApop}
                                        </p>
                                        <BtnBase
                                            btnClass="hover:bg-gold transition-all duration-300"
                                            textClassName="group-hover:text-foreground transition-all duration-300"
                                            iconEnd={BsArrowDownRightCircle}
                                            onClick={handleOpenPop}
                                        >
                                            {dictionary.btnApop}
                                        </BtnBase>
                                    </div>
                                </PopUpA>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </section>
    )
}