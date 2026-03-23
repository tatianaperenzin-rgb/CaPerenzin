"use client"

import { useState } from "react"
import MasterTitle from "../ui/typography/masterTitle"
import BubbleFrame from "../ui/bubbleFrame"
import BtnBase from "../ui/btnBase"
import { TbBuildingAirport } from "react-icons/tb"
import { GiStoneTower } from "react-icons/gi"
import { BiWater } from "react-icons/bi"
import { TbTrain } from "react-icons/tb"
import SmartBackground from "../image/smartBackround"
import BookingNav from "../ui/booking/bookingNav"
import { FaBus } from "react-icons/fa"
import { MdBabyChangingStation, MdTipsAndUpdates } from "react-icons/md"
import { Icon } from '@iconify/react'
import { LuLogOut } from "react-icons/lu"
import InfoPill from "../ui/infoPill"
import { TbParkingCircleFilled } from "react-icons/tb"
import { IoCloseCircle } from "react-icons/io5"

export default function SectionN({ dictionary, lang }) {

    const extra = {
        "A": {
            id: dictionary.labelBtn.id,
            icon: TbBuildingAirport,
            url: "",
        },
        "B": {
            id: dictionary.labelBtn.id,
            icon: GiStoneTower,
            url: "",
        },
        "C": {
            id: dictionary.labelBtn.id,
            icon: BiWater,
            url: "",
        },
        "D": {
            id: dictionary.labelBtn.id,
            icon: TbTrain,
            url: "",
        },
        tower: TbBuildingAirport,
        bus: FaBus,
        train: TbTrain,
        tips: MdTipsAndUpdates,
        park: TbParkingCircleFilled,
        maps: (props) => <Icon icon="logos:google-maps" width="48.83" height="70" {...props} />,
        logOut: LuLogOut
    }



    const [activeId, setActiveId] = useState(null)
    //Tracciamo il sotto-bottone (es. Treviso vs Venezia)
    const [subId, setSubId] = useState(null)

    const handleOpen = (id) => {
        if (activeId === id) {
            setActiveId(null)
        } else {
            setActiveId(id)
            setSubId(null)
        }
    }



    const activeItem = dictionary.labelBtn.find(item => item.id === activeId)

    const InfoBox = () => {
        if (!activeId) return null //nulla ttivo = mostro niente



        // Controlliamo se questo item ha sotto-menu (come A) o è diretto (come D)
        const hasSubButtons = activeItem.infoBox.buttons && activeItem.infoBox.buttons.length > 0

        const headlineClass = "font-bold text-md mb-5 mt-2 md:mt-3 "
        const textClass = "font-muller text-balance text-[11px] xxs:text-sm xs:text-base md:text-md leading-5 py-1"
        const textClassName = "font-muller text-base"
        const textClassNameSmall = "font-muller group-hover:text-foreground transition-all duration-300"

        const btnSlideClass = "hover:bg-background transition-all duration-300"
        const btnSlideClassLabel = "group-hover:text-foreground transition-all duration-300 text-[11px] xs:text-xs lg:text-xs"

        const btnSliceClassIcon = "group-hover:text-foreground transition-all duration-300"

        const textMapClass = "bg-background"

        const logOutClass = "mb-5 mt-2 rotate-180 cursor-pointer hover:text-background transition-all duration-300"

        return (
            <div className="flex w-full  h-fit bg-gold shadow-xl backdrop-blur-lg rounded-3xl xl:rounded-[40px] items-center justify-center p-5 relative">


                {/* LAYOUT ONLY A first slide */}
                {activeId === "A" ? (
                    <div className="flex flex-col p-3 ">
                        <IoCloseCircle size={20} className="absolute top-2 xl:top-5 xl:right-5 lg:top-2.5 right-3 cursor-pointer hover:text-background transitiona-all duration-300" onClick={() => setActiveId(null)} />
                        {!subId ? (
                            <div className="flex flex-col items-center justify-center gap-10 md:py-7">

                                <h2 className="font-bold text-2xl">
                                    {activeItem.infoBox?.title}
                                </h2>
                                <div className="flex flex-col gap-3">
                                    {activeItem.infoBox.buttons.map((item, i) => (


                                        <BtnBase

                                            key={item.id}
                                            onClick={() => setSubId(item.id)}
                                            iconStart={extra.tower}
                                            iconClassName={btnSliceClassIcon}
                                            btnClass={btnSlideClass}
                                            textClassName={btnSlideClassLabel}
                                        >
                                            {item.id}
                                        </BtnBase>
                                    ))}
                                </div>
                            </div>

                        ) : (
                            /* SLIDE THROUGT A */
                            (() => {
                                const activeSubItem = activeItem.infoBox.buttons.find(info => info.id === subId)
                                return (
                                    <div className="flex flex-col">
                                        <div className="flex gap-3 md:gap-5">
                                            <LuLogOut className={logOutClass} size={30} onClick={() => setSubId(null)} />
                                            <h1 className={headlineClass}>
                                                {activeSubItem?.info?.title}
                                            </h1>
                                        </div>

                                        <p className={`pe-0 xs:pe-0  ${textClass}`}>
                                            {activeSubItem?.info?.text}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-7">
                                            {activeSubItem?.info?.infoBtn?.map((item) => {
                                                const icon = extra[item.id]
                                                return (
                                                    <BtnBase key={item.id} iconStart={icon} textClassName={textClassNameSmall} iconClassName={btnSliceClassIcon}
                                                        className={btnSlideClass} href={item.urlWebSite}>
                                                        {item.label}

                                                    </BtnBase>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })()
                        )}
                    </div>
                ) : (
                    /* LAYOUT B_C_ button TIPS */
                    <div className="flex flex-col p-3">
                        {!subId ? (
                            <>
                                <div className="flex gap-3 md:gap-5">
                                    <LuLogOut className={logOutClass} size={30} onClick={() => setActiveId(null)} />
                                    <h1 className={headlineClass}>
                                        {activeItem.infoBox?.title}
                                    </h1>
                                </div>
                                <p className={`${textClass}`}>
                                    {activeItem.infoBox?.text}
                                </p>

                                <div className="block flex-col ps-3 xs:ps-4 md:mt-5 ">
                                    {/* DOT-LIST */}
                                    {activeItem.infoBox?.dotList?.map((i, index) => (
                                        <li key={index} className={textClass}>
                                            {i}
                                        </li>
                                    ))}
                                    {/* IF TIPS BTN?? */}
                                    {activeItem.infoBox?.buttons?.[0]?.id === "tips" ? (
                                        /* TIP BUTTONS */
                                        activeItem.infoBox.buttons.map((btn) => (
                                            <BtnBase
                                                className="mt-7"
                                                key={btn.id}
                                                iconStart={extra.tips}
                                                onClick={() => setSubId(btn.id)}
                                                iconClassName={btnSliceClassIcon}
                                                btnClass={btnSlideClass}
                                                textClassName={btnSlideClassLabel}
                                            >
                                                {btn.label}
                                            </BtnBase>
                                        ))
                                    ) : (
                                        /* MAP BUTTONS */
                                        <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-3 mt-7 ">
                                            {activeItem.infoBox?.infoBtn?.map((item, i) => (
                                                <div className="flex" key={item.label || i}>

                                                    <BtnBase
                                                        key={item.id}
                                                        iconStart={extra.maps}
                                                        iconClassName={btnSliceClassIcon}
                                                        className={btnSlideClass}
                                                        textClassName={btnSlideClassLabel}
                                                        href={item.gMaps}
                                                    >
                                                        {item.label}
                                                    </BtnBase>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            /* LAYOUT SLIDE THROUGT TIPS BUTTON */
                            (() => {
                                const activeSubItem = activeItem.infoBox.buttons.find(info => info.id === subId && info.id === "tips")
                                return (
                                    <div className="flex flex-col">
                                        <div className="flex gap-3 md:gap-5">
                                            <LuLogOut className={logOutClass} size={30} onClick={() => setSubId(null)} />
                                            <div className="mt-2">
                                                <InfoPill className="gap-3">
                                                    <MdTipsAndUpdates size={15} />
                                                    {activeSubItem?.label}
                                                </InfoPill>
                                            </div>
                                        </div>

                                        <p className={`pe-6 text-balance ${textClass}`}>
                                            {activeSubItem?.text}
                                        </p>

                                        <div className="flex gap-2 mt-7">
                                            {activeSubItem?.infoBtn?.map((item) => {
                                                const icon = extra[item.id]
                                                return (
                                                    <BtnBase key={item.id} iconStart={icon} textClassName={textClassNameSmall} iconClassName={btnSliceClassIcon}
                                                        className={btnSlideClass} href={item.urlWebSite}
                                                    >
                                                        {item.label}
                                                    </BtnBase>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })()
                        )}
                    </div>
                )
                }
            </div >
        )

    }


    return (
        <section className="flex w-full h-dvh lg:h-full items-center justify-center sticky top-0">
            <BubbleFrame divBubbleCls={`h-dvh`} bubbleClass="p-5 xs:p-8 md:p-17 lg:p-15 xl:p-20 sticky top-0">
                <SmartBackground
                    srcDesktop={dictionary.scrImgDesk}
                    srcMobile={dictionary.scrImgPhone}
                    alt={dictionary.altImg}
                />
                <div className="absolute top-0 left-0 inset-0 z-1 flex w-full h-full bg-black/40" />
                {/* HEADLINE E BUTTON */}
                <div className={`flex flex-col w-full h-full lg:w-1/2 justify-between relative z-10 gap-3 lg:justify-end xl:justify-center  `}>
                    <div className={`flex flex-col  gap-7 lg:gap-17 xl:gap-16 h-full xl:h-[55vh]  ${activeId ? "xl:justify-between" : "justify-center xl:justify-center "}`}>
                        {/* HEADLINE */}

                        <h2 className={`font-black 

                                             ${!activeId
                                ? "mt-0 xs:mt-60 lg:mt-0  font-black  text-4xl xs:text-5xl md:text-6xl xl:text-[50px] 2xl:text-7xl  text-balance lg:w-200 xl:text-wrap it:xl:w-130 it:2xl:w-200 en:xl:w-200"
                                : "mt-20  xs:mt-20 xl:mt-0 [@media(max-width:376px)]:hidden leading-none xs:flex text-2xl xxs:text-[25px]  xs:text-[40px] it:w-50 en:w-50 it:xxs:w-100 it:xs:w-100 en:xs:w-85 it:md:w-120 en:md:w-130 it:lg:w-100 en:lg:w-170 it:xl:w-130 it:2xl:w-190 en:xl:w-200 md:text-5xl lg:text-6xl  xl:text-[50px] 2xl:text-7xl "}
                                        `}>
                            {dictionary.headline}
                        </h2>



                        {/* BOX BUTTON  */}
                        <div className={` ${activeId ? "flex xl:flex-col [@media(max-width:669px)]:flex gap-1 xl:gap-0 mt-15 xxs:mt-0 xs:mt-0" : ""}`}>
                            {dictionary.labelBtn.map((item, index) => {
                                const asset = extra[item.id]
                                const icon = asset ? asset.icon : null;

                                return (
                                    <div key={item.id} className="flex ">

                                        <BtnBase
                                            className={`my-2
                                                    ${activeId === item.id ? "bg-gold" : null}
                                                
                                                `}
                                            btnClass="shadow-md hover:bg-gold h-9"

                                            iconStart={icon}
                                            textClassName={`text-[10px] xs:text-xs lg:text-xs group-hover:text-foreground
                                                    ${activeId && activeId !== item.id ? "hidden xl:flex" : "block"}
                                                    ${activeId === item.id ? "text-white max-xl:truncate max-w-15 xs:max-w-40 xl:max-w-none" : ""}`}
                                            iconClassName={`${activeId === item.id ? "text-foreground" : ""}`}
                                            onClick={() => handleOpen(item.id)}
                                        >

                                            {item.label}
                                        </BtnBase>

                                    </div>
                                )
                            })}

                        </div>
                    </div>


                    <div className="lg:hidden flex">
                        {activeId && <InfoBox />}
                    </div>

                </div>
                {/* BOOKNAV E INFOBOX */}
                <div className="hidden lg:flex w-full lg:w-1/2 lg:ps-20 xl:ps-0  relative z-10 items-end xl:items-center">
                    <div className="xl:h-[55vh] flex items-end w-full">
                        {activeId && <InfoBox />}
                    </div>
                </div>

            </BubbleFrame>
        </section>
    )
}