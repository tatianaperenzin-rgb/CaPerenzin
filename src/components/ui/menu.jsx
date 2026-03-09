"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import BubbleFrame from "./bubbleFrame"
import NavBar from "./navbar"
import SmartBackground from "../image/smartBackround"
import Image from "next/image"
import Link from "next/link"
import { BsArrowDownRightCircle } from "react-icons/bs"
import { RiDoorLockFill } from "react-icons/ri"

export default function Menu({ setIsOpen, dictionary, dataRooms, lang, hero }) {

    const textClass = "text-xl xs:text-2xl font-bold hover:text-white transition-colors duration-300"
    const defaultBk = "https://res.cloudinary.com/dp1xgwqau/image/upload/v1766344542/madness_of_art_Cinematic_wide_shot_interior_looking_out_from__7cbe6a9f-3f9e-419f-936e-80959b105f6d_1_fmsrhc.png"
    const [bgImage, setBgImage] = useState(defaultBk)

    const [roomList, setRoomList] = useState(false)
    const timeoutRef = useRef(null)

    // Apre subito e cancella timer chiusura
    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setRoomList(true)
    }

    // Chiude dopo 3 secondi
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setRoomList(false)
        }, 800)
    }

    // Gestione mobile (click immediato)
    const hendelroom = () => {
        setRoomList(!roomList)
    }

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [])

    const RoomList = () => {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {dataRooms && dataRooms.map((item, i) => (
                    <Link key={i} href={`/${lang}/camere/${item.slug}`} onClick={() => setIsOpen(false)}>
                        <div
                            className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity text-background w-fit"
                            onMouseEnter={() => item.gallery && item.gallery[0]?.bkDesk && setBgImage(item.gallery[0].bkDesk)}
                            onMouseLeave={() => setBgImage(defaultBk)}
                        >
                            <RiDoorLockFill />
                            <p className="text-xs xs:text-sm md:text-base lg:font-medium lg:text-base xl:text-lg w-fit">
                                {item.roomName}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        )
    }



    return (
        <div className="flex  w-full h-dvh fixed top-0 left-0 pointer-events-auto bg-background">
            <BubbleFrame className="h-dvh" bubbleClass="items-center xl:items-end " color="bg-gold" >

                <div className="flex w-full flex-col  gap-7 xl:gap-0 p-5 mt-15">

                    <p className="hidden lg:flex font-black md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl absolute top-5 left-5">{hero.BeBname}</p>
                    <div className="flex flex-col xl:flex-row xl:items-end xl:gap-30">
                        {/* HOME + COMTACT(desk) */}

                        <div className="flex flex-col">
                            <Link href={`/${lang}`} onClick={() => setIsOpen(false)}>

                                <p className="font-black text-5xl xs:text-7xl py-5 xl:py-0 hover:text-white transition-colors duration-300">
                                    {dictionary.home}
                                </p>
                            </Link>

                            <Link href={`/${lang}/contatti`} onClick={() => setIsOpen(false)}>
                                <p className="font-bold text-4xl xs:text-5xl mt-5 hidden xl:block hover:text-white transition-colors duration-300">
                                    {dictionary.contact}
                                </p>
                            </Link>
                        </div>

                        {/* MENU */}
                        <div className="flex w-full">

                            <div className="flex flex-col gap-2 lg:w-1/2 ">
                                <Link href={`/${lang}/#breakfast`} onClick={() => setIsOpen(false)}>
                                    <div className="flex items-center gap-2">

                                        <p className={textClass}>
                                            {dictionary.wakeUp}
                                        </p>
                                        <BsArrowDownRightCircle className="" />
                                    </div>
                                </Link>

                                {/* CAMERE  */}
                                <div className="flex flex-col gap-2 cursor-pointer"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div className="flex items-center gap-2 " onClick={hendelroom}>
                                        <p className={` ${textClass}`}>
                                            {dictionary.room}
                                        </p>
                                        <BsArrowDownRightCircle className="animate-pulse" />
                                    </div>


                                    <div className={`flex flex-col gap-2 pl-4 pb-4 overflow-hidden transition-all duration-300
                                                ${!roomList ? "hidden opacity-0 pb-0" : "h-auto opacity-100 lg:hidden"}
                                                
                                                `}>
                                        <RoomList />

                                    </div>
                                </div>


                                <Link href={`/${lang}/experiences`} onClick={() => setIsOpen(false)}>
                                    <div className="flex items-center gap-2">
                                        <p className={textClass}>
                                            {dictionary.experience}
                                        </p>
                                        <BsArrowDownRightCircle className="" />
                                    </div>
                                </Link>

                            </div>

                            {/* ROOM LIST ON HOVER DESKTOP */}
                            <div className={`hidden lg:flex flex-col gap-2 lg:w-1/2 transition-opacity duration-500  justify-end
                                  ${!roomList ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <RoomList />

                            </div>
                        </div>
                    </div>

                    <div className="relative flex w-full h-50 xs:h-70  md:h-80 xl:h-100 md:my-10 lg:my-0 bg-gold rounded-3xl xl:rounded-[40px] overflow-hidden xl:mt-20 ">
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={bgImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <Image
                                    src={bgImage}
                                    fill
                                    alt="menu image"
                                    className="object-cover"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* CONTACT modile */}
                    <Link href={`/${lang}/contatti`} onClick={() => setIsOpen(false)}>
                        <p className="font-bold text-4xl xs:text-5xl mt-5 xl:hidden">
                            {dictionary.contact}
                        </p>
                    </Link>

                </div>







            </BubbleFrame >
        </div >
    )
}