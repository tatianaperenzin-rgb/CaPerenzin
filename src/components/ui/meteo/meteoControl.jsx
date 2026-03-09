

import { cn } from "@/lib/utility"
import BtnBase from "@/components/ui/btnBase"
import { BsStars } from "react-icons/bs"
import { BsMoonStarsFill } from "react-icons/bs"
import { BsCloudLightningRainFill } from "react-icons/bs";

export default function MeteoControl({ dictionary, lang, onChange, activeId, onClose, className, btnClassName }) {

    const classBtn = "w-fit transition-all duration-300 hover:bg-gold"
    const textBtn = "transition-all duration-300 group-hover:text-foreground"

    return (
        <div className={cn(`flex h-fit flex-col
                            gap-5 md:gap-10`, className)}>
            {/* CTA */}
            <p className="
                it:w-40 it:xs:w-50 it:md:w-auto
                
                text-xs xs:text-base">
                {dictionary.ctaBtnD}!
            </p>

            {/* BTN BLOCK */}
            <div className={cn(`flex flex-col flex-wrap md:flex-row
                                gap-3 xs:gap-5`, btnClassName)}>
                <BtnBase
                    className={classBtn}
                    textClassName={textBtn}
                    iconStart={BsStars}
                    onClick={() => onChange(1)}
                >
                    {dictionary.btnDone}
                </BtnBase>
                <BtnBase
                    className={classBtn}
                    textClassName={textBtn}
                    iconStart={BsMoonStarsFill}
                    onClick={() => onChange(2)}
                >
                    {dictionary.btnDtwo}
                </BtnBase>
                <BtnBase
                    className={classBtn}
                    textClassName={textBtn}
                    iconStart={BsCloudLightningRainFill}
                    onClick={() => onChange(3)}
                >
                    {dictionary.btnDthird}
                </BtnBase>
            </div>
        </div>
    )
}