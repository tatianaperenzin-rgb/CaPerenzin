
import MasterTitle from "@/components/ui/typography/masterTitle"
import MeteoControl from "@/components/ui/meteo/meteoControl"

export default function Star({ dictionary, lang, onChange, activeId }) {
    return (
        <div className="flex flex-col h-svh lg:h-dvh w-full justify-around
                        px-10 xs:px-14 md:px-20 lg:px-30 2xl:px-50">

            <div className="flex flex-col">
                <MasterTitle>
                    {dictionary.headlineStar}
                </MasterTitle>

                <p>
                    testo
                </p>
            </div>

            <MeteoControl
                className=""
                dictionary={dictionary}
                lang={lang}
                onChange={onChange} // Passa la funzione corretta
                activeId={activeId}
            />

        </div>
    )
}