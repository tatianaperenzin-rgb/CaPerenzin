"use client"


import TextReveal from "@/components/ui/typography/textReveal"


export default function SectionF({ dictionary, lang }) {
    return (
        <section className={`w-full flex justify-center items-center 
                        mt-[-0] 2xl:mt-0
                        mb-20
                        h-[105vh] lg:h-dvh `}>
            <div className={`w-full max-w-7xl
                            px-12 xs:px13 md:px-30 xl:px-45 2xl:px-20`}>

                <TextReveal className={`text-white font-bold  text-balance
                                        text-lg xs:text-xl 2xl:text-2xl
                                        whitespace-pre-wrap
                                    `}
                    startOffset="0.4">

                    {`${dictionary.paragraphOne}\n\n ${dictionary.paragraphTwo}`}
                </TextReveal>

            </div>
        </section>
    )
}