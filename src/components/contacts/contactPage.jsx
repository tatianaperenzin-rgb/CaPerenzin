"use client"

import { useState } from "react"
import MasterTitle from "@/components/ui/typography/masterTitle"
import BtnBase from "@/components/ui/btnBase"
import SectionO from "@/components/home/sectionO"
import { Icon } from '@iconify/react'
import { BsPhoneFill } from "react-icons/bs"
import { RiSendPlaneFill } from "react-icons/ri"
import FormNew from "./formNew"
import BubbleFrame from "../ui/bubbleFrame"
import GoogleMapComponent from "./GoogleMapComponent"
import FullScreenLoader from "../ui/fullScreenLoader"


export default function ContactPage({ dictionary, lang, dictionarySectionO, dictionaryForm, bookingDictionary }) {

    const [isForm, setIsForm] = useState(null)
    const [isLoadingMap, setIsLoadingMap] = useState(false)

    const handleClick = () => {
        setIsForm(!isForm)
    }

    const handleNavigation = () => {
        setIsLoadingMap(true)
        setTimeout(() => {
            window.open(bookingDictionary.assetUi.navigatorBeB.gMaps, '_blank')
            setIsLoadingMap(false)
        }, 500)
    }


    const extra = {
        maps: (props) => <Icon icon="logos:google-maps" width="48.83" height="70" {...props} />,
        whatsApp: (props) => <Icon icon="ri:whatsapp-fill" width="70" height="70" style={{ color: '#08cb51' }} {...props} />,
        cell: BsPhoneFill,
        send: RiSendPlaneFill

    }

    const btnSlideClass = "hover:bg-gold transition-all duration-300"
    const btnSlideClassLabel = "group-hover:text-foreground transition-all duration-300 text-[11px] xs:text-xs lg:text-xs"
    const btnSliceClassIcon = "group-hover:text-foreground transition-all duration-300"



    return (
        <div className="flex flex-col w-full relative">

            {/* Loader */}
            {isLoadingMap && <FullScreenLoader label={bookingDictionary.assetUi.navigatorBeB.loadingText} />}

            <div className="contents lg:sticky lg:top-0 lg:z-0 lg:flex lg:h-dvh lg:w-full lg:flex-row xl:px-[20px]">

                {/* BOX TEXT E DATA */}
                <div className="flex flex-col 
                            h-[90vh] md:h-dvh 
                            w-full lg:w-1/2
                            gap-20 xs:gap-30 
                            p-7 md:ps-28 lg:ps-15
                             
                            justify-center">

                    <div>
                        <MasterTitle
                            className="w-min
                                        text-4xl xs:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl"
                        >
                            {dictionary.headline}
                        </MasterTitle>

                        <p
                            className="font-bold text-lg xs:text-xl md:text-3xl xl:text-2xl pt-3"
                        >{dictionary.subHeadline}</p>

                        <p
                            className="font-muller
                                    py-7 text-balance md:pe-20 
                                    text-xs xs:text-base md:text-lg lg:text-sm xl:text-base"
                        >{dictionary.content}</p>

                        <div className="flex flex-wrap gap-3
                                    xs:gap-4
                                    xs:mt-10
                                    pe-20">
                            {dictionary.buttons.map((item, i) => {

                                const icons = extra[item.id]

                                const url = item.id === "whatsApp"
                                    ? `https://wa.me/${item.nuber.replace(/[^0-9]/g, '')}`
                                    : item.id === "cell"
                                        ? `tel:${item.label.replace(/[^0-9]/g, '')}`
                                        : null

                                // Gestione differenziata degli stili hover
                                const customBtnClass = item.id === "whatsApp"
                                    ? "hover:bg-[#25D366] transition-all duration-300" // Green WhatsApp
                                    : "hover:bg-gold transition-all duration-300" // Gold default

                                return (
                                    <div key={item.id} className="flex">
                                        <BtnBase
                                            iconStart={icons}
                                            href={url}
                                            iconClassName={btnSliceClassIcon}
                                            className={customBtnClass}
                                            textClassName={btnSlideClassLabel}
                                        >
                                            {item.label}
                                        </BtnBase>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col gap-7">
                        <h2 className="font-bold text-balance it:w-min it:xl:w-170 text-2xl xs:text-4xl">
                            {dictionary.ctaMail}
                        </h2>
                        <div>
                            <BtnBase
                                onClick={handleClick}
                                iconStart={extra.send}
                                iconClassName={btnSliceClassIcon}
                                btnClass={btnSlideClass}
                                textClassName={btnSlideClassLabel}
                            >
                                {dictionary.mailBtn.label}
                            </BtnBase>
                        </div>

                    </div>



                </div>


                {/* BOX MAPS */}
                {!isForm ? (
                    <div className="flex w-full lg:w-1/2 h-dvh p-2 lg:p-5 xl:p-0 xl:pt-5   sticky top-0 ">


                        <GoogleMapComponent dictionary={bookingDictionary} className="rounded-3xl xl:rounded-[40px] h-full lg:h-[95.5vh]" />



                        {/* BOX ADRESS E BTN */}
                        <div className="flex flex-col w-auto h-auto p-5 bg-background rounded-3xl xl:rounded-[20px] shadow-xl absolute bottom-8 right-4 lg:right-7   xl:right-2 xl:bottom-10  gap-3">
                            <p className="text-right font-muller text-xs">{dictionary.infoBox.adress}</p>
                            <BtnBase
                                onClick={handleNavigation}
                                iconEnd={extra.maps}
                                textClassName="text-[11px] xs:text-[14px] lg:text-xs"
                                className="h-9 xs:h-10.5 lg:h-9 xl:h-9 border-2 border-transparent border-t-[#4285F4] border-r-[#EA4335] border-b-[#FBBC05] border-l-[#34A853] transition-all duration-300"
                            >
                                {dictionary.infoBox.btn.label}
                            </BtnBase>
                        </div>
                    </div>
                ) : (
                    <FormNew onClose={handleClick} dictionary={dictionaryForm} lang={lang} />
                )}


            </div>
            <SectionO dictionary={dictionarySectionO} lang={lang} bookingDictionary={bookingDictionary} />



        </div>
    )
}