"use client"


import TextReveal from "@/components/ui/typography/textReveal"


export default function SectionL({ dictionary }) {
    return (
        <section className={`w-full flex justify-center items-center 
                        mt-[-0] 2xl:mt-0
                        mb-45 lg:mb-35 
                        h-[30vh] xxs:h-[45vh] xs:h-[30vh] md:h-[5vh] lg:h-dvh`}>
            <div className={`w-full max-w-7xl
                            px-12 xxs:px-20 xs:px-15 md:px-30 lg:px-55 xl:px-57 2xl:px-25`}>

                {/* Usa il componente qui.
                   Dagli le classi del font che vuoi (colore, grandezza, font-family).
                */}
                <TextReveal className={`text-white font-bold text-balance
                                        text-xs xxs:text-base xs:text-lg md:text-lg  lg:text-lg xl:text-lg 2xl:text-2xl
                                        whitespace-pre-wrap
                                    `}
                    startOffset="0.4">
                    {/* Qui passi il testo lungo dal dizionario. 
                        Assicurati che sia una stringa unica, non un array. */}
                    {dictionary.content}
                </TextReveal>

            </div>
        </section>
    )
}