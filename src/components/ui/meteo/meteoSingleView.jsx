
import BubbleFrame from "../bubbleFrame"
import SmartVideoBg from "@/components/image/smartVideoBg"
import MasterTitle from "@/components/ui/typography/masterTitle"
import MeteoControl from "@/components/ui/meteo/meteoControl"

export default function MeteoSingleView({ data, dictionary, lang, onChange, activeId }) {
    return (
        <BubbleFrame color="bg-transparentr" className="h-dvh" >
            <SmartVideoBg
                src={data.src}
            />
            <div className="flex w-full h-full bg-black/30  absolute top-0 left-0 inset-0 z[-1]" />

            <div className="flex flex-col h-dvh w-full justify-between z-20
                            py-30 xs:py-37 
                            px-10 xs:px-14 md:px-20 lg:px-30 2xl:px-50">

                <div className="flex flex-col gap-5 xs:gap-7">
                    <MasterTitle>
                        {data.headline}
                    </MasterTitle>

                    <p className="text-xs xs:text-sm
                                    lg:w-150 xl:w-180">
                        {data.content}
                    </p>
                </div>


                <MeteoControl
                    className=""
                    dictionary={dictionary}
                    lang={lang}
                    onChange={onChange} // Passa la funzione corretta
                    activeId={activeId}
                />

                {/* NOTE (Visibile solo nel menu) */}
                <p className="flex items-center text-center absolute bottom-5 left-0 lg:left-33 w-full justify-center lg:justify-start
                                  text-[9px] xs:text-[12px] md:text-xs px-15 text-gold opacity-50">
                    {dictionary.noteD}
                </p>


            </div>
        </BubbleFrame>
    )
}