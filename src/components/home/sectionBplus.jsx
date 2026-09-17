import MasterTitle from "../ui/typography/masterTitle"

// Stessa impaginazione della "vista zero" di SectionD, senza i bottoni meteo
export default function SectionBplus({ dictionary, lang }) {
    return (
        <section className="relative flex flex-col w-full h-fit mb-30 mt-[-70] justify-center items-center overflow-hidden">

            <div className="flex flex-col w-full h-full justify-center px-10 xs:px-14 md:px-20 lg:px-30 2xl:px-50 gap-20 xxs:gap-40 animate-fade-in">

                {/* BLOCK HEADLINE */}
                <div className="flex flex-col gap-7 ">
                    <div className="flex w-min">
                        <MasterTitle className="text-[25px] xs:text-[49xpx]  leading-none md:text-7xl lg:text-6xl xl:text-6xl 2xl:text-7xl" tag="h2">
                            {dictionary?.display?.replace(/le nostre/i, "Le nostre")}
                        </MasterTitle>
                    </div>
                    {dictionary?.subHeadline && (
                        <p className="text-xs xs:text-sm md:text-lg it:w-65 it:xs:w-65 it:md:w-xl en:w-xs en:md:w-2xl">
                            {dictionary.subHeadline}
                        </p>
                    )}
                </div>

                {/* NOTE */}
                {dictionary?.note && (
                    <p className="flex items-center text-center absolute bottom-5 left-0 w-full justify-center text-balance text-[10px] xxs:-[7px] xs:text-[12px] md:text-xs px-15 md:px-30 text-gold opacity-50">
                        {dictionary.note}
                    </p>
                )}
            </div>

        </section>
    )
}
