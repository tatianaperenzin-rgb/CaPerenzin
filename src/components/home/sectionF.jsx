"use client"


import TextReveal from "@/components/ui/typography/textReveal"


export default function SectionF({ dictionary, lang }) {
    return (
        <section className={`w-full flex justify-center items-center 
                        mt-[-0] 2xl:mt-0
                        mb-20
                        h-[80vh] xxs:h-[80vh] xs:h-[90vh] md:h-[65vh] lg:h-dvh `}>
            <div className={`w-full max-w-7xl
                            px-12 xxs:px-20 xs:px-15 md:px-30 lg:px-55 xl:px-57 2xl:px-25`}>

                <TextReveal className={`text-white font-bold  text-balance
                                        text-xs xxs:text-sm xs:text-base md:text-md  lg:text-lg xl:text-lg 2xl:text-xl
                                        whitespace-pre-wrap
                                    `}
                    startOffset="0.4">

                    {`${dictionary.paragraphOne}\n\n ${dictionary.paragraphTwo}`}
                </TextReveal>

            </div>
        </section>
    )
}