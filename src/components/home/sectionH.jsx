"use client"

import { useState } from "react"
import SmartBackground from "../image/smartBackround"
import InfoPill from "../ui/infoPill"
import { BsArrowRight } from "react-icons/bs"
import BtnBase from "../ui/btnBase"

export default function SectionH({ dictionary, lang }) {

    const [isOpen, setIsOpen] = useState(null)
    const handelClick = () => setIsOpen(!isOpen)

    const classText = "font-muller text-sm xs:text-base md:pe-7 lg:pe-0 lg:ps-7 xl:ps-20 2xl:ps-50 lg:text-right"

    return (
        // AGGIUNTO: w-screen (o min-w-full) e flex-shrink-0
        // Questo dice: "Io occupo tutto lo schermo e nessuno può schiacciarmi"
        <section className="w-full h-full lg:h-dvh flex flex-col lg:flex-row justify-center items-center gap-5  p-2 md:p-5">

            {/* CARD TWO IMG */}
            <div className={`relative overflow-hidden flex w-full h-1/2 lg:h-full lg:w-1/2 bg-amber-900/60 rounded-3xl xl:rounded-[40px]
            ${isOpen ? "h-[35%] lg:h-full" : "h-1/2 lg:h-full"}`}>
                <SmartBackground
                    srcDesktop={dictionary?.scrImgDesk}
                    srcMobile={dictionary?.scrImgPhone}
                    scrAlt={dictionary?.scrAlt}
                />
            </div>

            {/* CARD ONE  TEXT */}
            <div className={`flex w-full h-fit md:h-1/2 lg:h-full lg:w-1/2 bg-gold rounded-3xl xl:rounded-[40px]
                            p-7 md:p-15 lg:p-10
                            transition-all duration-300 ease-in-out
                            ${isOpen ? "h-[85%] lg:h-full" : "h-1/2 lg:h-full"}`}>

                <div className={`flex flex-col 
                                ${isOpen ? "gap-7 md:justify-between" : "justify-between"}
                                `}>


                    {/* CONTENT */}
                    <div className="flex-flex-col
                                    pe-6
                                    ">

                        {/* TITLE */}
                        <h2 className="font-black text-background text-balance 
                                    w-75 xs:w-110 md:w-150 lg:w-fit 2xl:w-full 2xl:ps-40
                                     text-3xl xs:text-4xl md:text-5xl lg:text-5xl xl:text-7xl
                                    lg:pt-55 xl:pt-30 2xl:pt-50
                                    lg:text-right">
                            {dictionary.headline}
                        </h2>

                        <p className={`pt-7 md:pt-10 text-balance ${classText}`}>{dictionary.content.paragraphOne}</p>

                        {/* CONTENT OPEN ONLY TABLET E DESK */}
                        <p className={`pt-3 text-balance   hidden md:flex ${classText}`}>{dictionary.content.paragraphTwo}</p>
                        <p className={`pt-3 text-balance   hidden md:flex ${classText}`}>{dictionary.content.paragraphThree}</p>

                        {/* CONTENT ONLY SMARPHONE */}
                        {isOpen && (
                            <div className={`flex flex-col
                                            md:hidden
                                            pt-5
                                            transition-all duration-300
                                            ease-in-out
                                            delay-500
                                            ${isOpen ? "opacity-100" : "opacity-0"}
                                            ${classText}
                            `}>
                                <p className="text-balance">{dictionary.content.paragraphTwo}</p>
                                <p className="pt-7 text-balance"
                                >{dictionary.content.paragraphThree}</p>
                            </div>
                        )}

                        {/* BUTTON */}
                        <button className="flex items-center gap-3 py-7 text-background md:hidden text-xs xs:text-sm" onClick={handelClick}>
                            {isOpen ? dictionary.readLess : dictionary.readMore}
                            <BsArrowRight className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
                        </button>

                    </div>
                    <div className="flex flex-col xl:flex xl:justify-end xl:items-end ">
                        <BtnBase className="md:mt-10 shadow-xl" textClassName="text-xs xs:text-sm text-background">
                            {dictionary.labelBtn}
                        </BtnBase>
                    </div>


                </div>

            </div>


        </section>
    )
}