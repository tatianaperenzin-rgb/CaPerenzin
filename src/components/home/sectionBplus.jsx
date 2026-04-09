
import MasterTitle from "../ui/typography/masterTitle"

export default function SectionBplus({ dictionary, lang }) {
    return (
        <div className="flex h-30 pb-20  w-full items-center justify-center ">
            <MasterTitle className="w-min lg:text-6xl xl:text-6xl 2xl:text-7xl lg:text-nowrap text-center text-gold">
                {dictionary?.display?.replace(/le nostre/i, "Le\u00A0nostre")}
            </MasterTitle>
        </div>
    )
}