"use client"


import TextReveal from "@/components/ui/typography/textReveal"


export default function SectionB({ dictionary }) {
    return (
        <section className={`w-full flex justify-center items-center  
                        
                        mb-70 md:mb-90
                        h-[30vh] xxs:h-[45vh] xs:h-[37vh] it:md:h-[5vh] en:md:h-[30vh] it:lg:h-dvh en:lg:h-dvh `}>
            <div className={`w-full max-w-7xl
                            px-12 xxs:px-20 xs:px-15 md:px-36 lg:px-55 xl:px-57 2xl:px-25`}>

                {/* Usa il componente qui.
                   Dagli le classi del font che vuoi (colore, grandezza, font-family).
                */}
                <TextReveal className={`text-white font-bold text-balance
                                         text-xs xxs:text-sm xs:text-base md:text-md  lg:text-lg xl:text-lg 2xl:text-xl
                                        whitespace-pre-wrap
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