"use client"

import { useState } from "react"
import SmartBackground from "../image/smartBackround"
import InfoPill from "../ui/infoPill"
import { BsArrowRight } from "react-icons/bs"

export default function SectionG({ dictionary, lang }) {

    const [isOpen, setIsOpen] = useState(null)
    const handelClick = () => setIsOpen(!isOpen)

    const classText = "font-muller text-sm xs:text-base md:pe-28 lg:pe-7 xl:pe-37 2xl:pe-50"
    const pillClass = " font-muller font-bold shadow-md"

    return (
        // AGGIUNTO: w-screen (o min-w-full) e flex-shrink-0
        // Questo dice: "Io occupo tutto lo schermo e nessuno può schiacciarmi"
        <section className="w-full h-full lg:h-dvh  flex flex-col lg:flex-row justify-center items-center gap-5  p-2 md:p-5">

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
                                    w-80 xs:w-100 md:w-170 lg:w-fit 2xl:w-150
                                    text-3xl xs:text-4xl md:text-5xl lg:text-5xl xl:text-7xl
                                    lg:pt-60 xl:pt-40 2xl:pt-70">
                            {dictionary.headline}
                        </h2>

                        <p className={`pt-7 text-balance md:pt-10 ${classText}`}>{dictionary.content.paragraphOne}</p>

                        {/* CONTENT OPEN ONLY TABLET E DESK */}
                        <p className={`pt-3 text-balance hidden md:flex ${classText}`}>{dictionary.content.paragraphTwo}</p>
                        <p className={`pt-3 text-balance  hidden md:flex ${classText}`}>{dictionary.content.paragraphThree}</p>

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

                    {/* PILLS */}
                    <div className="flex flex-wrap gap-2 pe-18 xs:pe-38 lg:pe-0 md:mt-10 xl:pe-40 2xl:pe-0 font-muller">
                        <InfoPill className={pillClass}>{dictionary.label.one}</InfoPill>
                        <InfoPill className={pillClass}>{dictionary.label.two}</InfoPill>
                        <InfoPill className={pillClass}>{dictionary.label.three}</InfoPill>
                        <InfoPill className={pillClass}>{dictionary.label.four}</InfoPill>
                    </div>
                </div>

            </div>

            {/* CARD TWO IMG */}
            <div className="relative overflow-hidden flex w-full h-1/2 lg:h-full lg:w-1/2 bg-amber-900/60 rounded-3xl xl:rounded-[40px]">
                <SmartBackground
                    srcDesktop={dictionary?.scrImgDesk}
                    srcMobile={dictionary?.scrImgPhone}
                    scrAlt={dictionary?.scrAlt}
                />
            </div>
        </section>
    )
}