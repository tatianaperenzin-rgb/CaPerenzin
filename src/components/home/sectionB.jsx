"use client"


import TextReveal from "@/components/ui/typography/textReveal"


export default function SectionB({ dictionary }) {
    return (
        <section className={`w-full flex justify-center items-center 
                        mt-[-170]
                        mb-20
                        h-150 xs:h-170 lg:h-dvh `}>
            <div className={`w-full max-w-7xl
                            px-12 xs:px13 md:px-30 xl:px-45 2xl:px-20`}>

                {/* Usa il componente qui.
                   Dagli le classi del font che vuoi (colore, grandezza, font-family).
                */}
                <TextReveal className={`text-white font-bold text-balance
                                        text-lg xs:text-xl 2xl:text-2xl
                                    `}
                    startOffset="0.4">
                    {/* Qui passi il testo lungo dal dizionario. 
                        Assicurati che sia una stringa unica, non un array. */}
                    {dictionary.textSectionB}
                </TextReveal>

            </div>
        </section>
    )
}