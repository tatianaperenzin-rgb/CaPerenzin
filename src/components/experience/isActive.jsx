"use client"

import { useState, useEffect } from "react"
import BubbleFrame from "../ui/bubbleFrame"
import SmartBackground from "../image/smartBackround"
import ExpCarousell from "./expCarousell"
import MasterTitle from "../ui/typography/masterTitle"
import InfoPill from "../ui/infoPill"
import BtnBase from "../ui/btnBase"
import { LuLogOut } from "react-icons/lu"
import { FaCar, FaGlobe, FaMap, FaFlag, FaBicycle, FaLandmark, FaHiking, FaSpa, FaCheese } from "react-icons/fa";
import { GiWaterMill } from "react-icons/gi";
import { PiChurchFill } from "react-icons/pi";
import { MdTipsAndUpdates } from "react-icons/md";
import { Icon } from '@iconify/react'


import FullScreenLoader from "../ui/fullScreenLoader"

export default function IsActive({ dictionary, exp, lang, experienceLibrary, className }) {


    const icons = {
        car: FaCar,
        place: FaMap,
        webSite: FaGlobe,
        maps: (props) => <Icon icon="logos:google-maps" width="48.83" height="70" {...props} />,
        hole: FaFlag,
        type: FaHiking,
        bike: FaBicycle,
        unesco: FaLandmark,
        traking: FaHiking,
        mill: GiWaterMill,
        spa: FaSpa,
        spirit: PiChurchFill,
        chees: FaCheese,
        tips: MdTipsAndUpdates
    }





    //console.log(experienceLibrary)

    const [isActive, setIsActive] = useState(experienceLibrary.experience[0]?.id || null)
    //console.log("this is first exp array?:", isActive)

    //CONTENT STATE
    const [isOpen, setIsOpne] = useState(null)

    //TIPS STATE
    const [isTips, setIsTips] = useState(null)

    // MAP LOADING STATE
    const [isLoadingMap, setIsLoadingMap] = useState(false)

    const toggleContent = () => setIsOpne(!isOpen)

    const hendelClick = (id) => {
        setIsActive(id)
        console.log("ID", id)
    }

    const showTips = () => {
        setIsTips(true)
    }

    const handleNavigation = (url) => {
        setIsLoadingMap(true)
        setTimeout(() => {
            window.open(url, '_blank')
            setIsLoadingMap(false)
        }, 500)
    }

    /* RESETTO GLI STATI DI APERTURA (TIPS E DESCRIZIONE) QUANDO CAMBIO CARD */
    useEffect(() => {
        setIsTips(null)
        setIsOpne(null)
    }, [isActive])

    const dataExperience = experienceLibrary.experience.find(exp => exp.id === isActive) || experienceLibrary.experience[0]
    //console.log("this data is same to first exp array?", dataExperience)

    /* AGGIORRNO E RESETTO IL COM CABIO ESPERIENZAS CON I BUTTON EXPERIENCE */
    useEffect(() => {
        if (experienceLibrary?.experience?.length > 0) {
            setIsActive(experienceLibrary.experience[0].id)
        }
    }, [experienceLibrary])

    console.log("DATA", dataExperience)

    const classTips = "font-muller text-sm text-balance"

    return (
        <BubbleFrame bubbleClass="flex flex-col justify-center" className={`${className} transition-all duration-300`}>

            {/* Loader */}
            {isLoadingMap && <FullScreenLoader label={dictionary.assetUi.navigatorBeB.loadingText} />}

            <SmartBackground
                srcDesktop={dataExperience?.srcDesk}
                srcMobile={dataExperience?.srcMobile}
                srcAlt={dataExperience?.srcAlt}
            />
            {/* OVERLAY BLACK GRADIENT */}
            <div className="absolute flex w-full inset-0 h-full bg-gradient-to-tr from-black/100 via-black/65 to-transparent z-10 pointer-events-none" />

            {/* CAROUSELL ALL ITEM EXP */}

            <ExpCarousell dictionary={dictionary} exp={exp} lang={lang} experienceLibrary={experienceLibrary}
                onClick={hendelClick} />

            {/* DINAMIC CONTENT__ HEADLINE _ CONTENTE _ TIPS */}
            <div className="flex flex-col p-4 z-20 h-svh pt-25 xs:pt-30 xl:pt-45 pb-35 justify-between xl:justify-start">

                <div className="flex flex-col">
                    {/* HEADLINE */}
                    <MasterTitle className="text-balance leading-tight md:text-6xl lg:text-7xl xl:text-6xl 2xl:text-7xl">
                        {!isActive ? experienceLibrary.experience[0].headline : dataExperience?.headline}
                    </MasterTitle>

                    {/* INFO PILLS */}
                    <div className="flex flex-wrap gap-2 mt-7">
                        {dataExperience?.pillsInfo.map((item, i) => {
                            const isMap = item.id === 'maps';
                            const url = item.urlWebSite || item.gMaps;

                            return (
                                <div key={i} className="flex">
                                    <InfoPill
                                        className={`border border-gold bg-foreground/80 ${isMap ? "cursor-pointer hover:bg-background hover:text-foreground transition-all duration-300" : ""}`}
                                        onClick={isMap ? () => handleNavigation(url) : undefined}
                                        href={!isMap ? url : undefined}
                                        IconStart={icons[item.id]}
                                    >
                                        {item.label}
                                    </InfoPill>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* CONTENT SMARTPHONE */}
                <div className="xl:hidden flex flex-col bg-gold/60 rounded-xl p-5 gap-5 transition-all duration-500 ease-in-out">
                    {!isTips ? (
                        <p className={`font-muller text-xs xs:text-sm transition duration-700  ${!isOpen ? "line-clamp-5" : ""}`}>
                            {dataExperience.content}
                        </p>
                    ) : null}

                    {/* READ MORE AND BTN TIPS */}
                    <div className="flex justify-between">
                        {!isTips ? (
                            <>
                                <p className="text-xs xs:text-sm pointer-cursor md:hidden " onClick={toggleContent}>
                                    {!isOpen ? dictionary.assetUi.readMore : dictionary.assetUi.readLess}
                                </p>

                                <InfoPill className={`cursor-pointer`}
                                    onClick={showTips}
                                    IconStart={icons.tips}
                                >
                                    {dictionary.assetUi.tips}
                                </InfoPill>
                            </>
                        ) : (

                            /* TIPS CONTENTENT  */
                            <div className="flex flex-col">

                                <p className={classTips}>
                                    {dataExperience.tips.contentOne}
                                </p>
                                <p className={classTips}>
                                    {dataExperience.tips.contentTwo}
                                </p>

                                <InfoPill className={`flex gap-2 mt-7`}
                                    onClick={() => setIsTips(false)}>
                                    <LuLogOut className="rotate-180" />
                                    {dictionary.assetUi.tips}
                                </InfoPill>
                            </div>

                        )}
                    </div>
                </div>

                {/* CONTENT DESKTOP */}
                <div className="hidden xl:flex flex-col xl:w-2/5 2xl:w-1/3 mt-18 ">
                    {/* TEXT CONTENT */}
                    <p className={`font-muller`}>
                        {dataExperience.content}
                    </p>
                    {/* TIPS BLOCK */}
                    <div className="flex flex-col gap-3 absolute bottom-7 left-7 w-100">
                        <InfoPill IconStart={icons.tips} className={`mb-5 bg-gold text-foreground`} iconClassName={`text-foregound`}>
                            {dictionary.assetUi.tips}
                        </InfoPill>

                        <p className={classTips}>
                            {dataExperience.tips.contentOne}
                        </p>
                        <p className={classTips}>
                            {dataExperience.tips.contentTwo}
                        </p>
                    </div>
                </div>

            </div>


        </BubbleFrame>
    )
}