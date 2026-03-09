"use client"

import { useState, useRef, useEffect } from "react"
import BubbleFrame from "@/components/ui/bubbleFrame"
import MasterTitle from "@/components/ui/typography/masterTitle"
import BtnBase from "@/components/ui/btnBase"
import { BsArrowDownRightCircle } from "react-icons/bs"
import SmartBackground from "../image/smartBackround"
import IsActive from "./isActive"
import { MdTravelExplore } from "react-icons/md";
import { FaBridge } from "react-icons/fa6";
import { PiBowlFoodFill } from "react-icons/pi";
import BtnActive from "@/hooks/btnActive"
import { BsStars } from "react-icons/bs"
import { useUI } from "@/hooks/contexUi"


import { useSearchParams } from "next/navigation"

export default function Experience({ dictionary, exp, lang }) {

    const { setExperienceActive, isMenuOpen } = useUI()

    const icon = {
        sport: MdTravelExplore,
        culture: FaBridge,
        food: PiBowlFoodFill
    }

    const searchParams = useSearchParams()
    const category = searchParams.get('category')

    const [isActive, setIsActive] = useState(null)

    useEffect(() => {
        if (category) {
            setIsActive(category)
        }
    }, [category])

    useEffect(() => {
        setExperienceActive(!!isActive)
        return () => setExperienceActive(false)
    }, [isActive, setExperienceActive])

    console.log("who is pressen?", isActive)

    const [isOpen, setIsOpen] = useState(null)
    const wrapperRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [wrapperRef])

    const hendelClick = (id) => {
        setIsActive(id)
        setIsOpen(false)
        console.log("button pressed ID:", id)
    }

    const toggleExp = () => setIsOpen(!isOpen)

    const activeExperience = exp.buttons.find(exp => exp.id === isActive)
    console.log("how exp is active now:", activeExperience)

    function TypeExp({ className }) {
        return (
            <div className={`flex flex-col xl:flex-row gap-2 md:gap-3 lg:gap-3   ${className}`}>
                {exp.buttons.map((item, i) => {
                    const { activeClass } = BtnActive(isActive, item.id)
                    const isItemActive = isActive === item.id

                    return (
                        <div key={item.id} className="flex">
                            <BtnBase
                                onClick={() => hendelClick(item.id)}
                                iconStart={icon[item.id]}
                                className={`
                            bg-foreground/90 border border-gold
                            ${activeClass}
                            ${!isItemActive ? "hover:bg-background transition-all duration-300" : ""}
                            `}
                                textClassName={!isItemActive ? "group-hover:text-foreground transition-all duration-300" : ""}
                                iconClassName={!isItemActive ? "group-hover:text-foreground transition-all duration-300" : ""}
                            >
                                {item.label}
                            </BtnBase>
                        </div>
                    )
                })}
            </div>
        )
    }





    return (
        <>

            <div className={`flex flex-col w-full h-svh lg:h-dvh justify-center items-center relative `}>
                <div className="flex flex-col gap-17 lg:gap-30 2xl:gap-37 ">

                    {/* HEADLINE ENTRY */}
                    <MasterTitle className={`
                        w-min whitespace-normal leading-relax lg:leading-none
                        ${!isActive ? "" : "hidden"}`}>
                        {exp.headline.replace("Mappa ", "Mappa\u00A0")}
                    </MasterTitle>

                    {/* BUTTONS STATE */}
                    {!isActive ? (
                        <TypeExp />
                    ) : (
                        <>
                            {/* PHONE */}
                            <div ref={wrapperRef} className={`xl:hidden block flex-col gap-3 w-fit  absolute top-7 left-5 md:top-9 md:left-7 2xl:left-8 z-999
                            transition-all duration-300
                            ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}
                            `}>
                                <BtnBase onClick={toggleExp} iconStart={BsStars}>
                                    {dictionary.assetUi.experience}
                                </BtnBase>
                                {isOpen && (<TypeExp className="absolute top-20 left-0" />)}
                            </div>
                            {/* DESKTOP */}
                            <div className={`hidden xl:flex flex-col gap-3 w-fit  absolute
                            top-6.5 left-5
                            md:top-9 md:left-7
                            xl:top-10 xl:left-8
                            2xl:top-11 
                            z-999
                            transition-all duration-300
                            ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}
                            `}>
                                <TypeExp />
                            </div>

                        </>
                    )}
                </div >

                {/* HEADLINE + INFO + CAROUSELL */}
                {activeExperience && <IsActive className={!isOpen ? "" : "blur-sm pointer-events-none"} dictionary={dictionary} exp={exp} lang={lang} experienceLibrary={activeExperience} />}
            </div >


        </>
    )
}