"use client"

import React, { useState, Fragment, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import BubbleFrame from "@/components/ui/bubbleFrame"
import BtnBase from "@/components/ui/btnBase"
import SmartBackground from "../image/smartBackround"
import MasterTitle from "../ui/typography/masterTitle"
import InfoPill from "../ui/infoPill"
import BookingNav from "../ui/booking/bookingNav"
import { BsArrowDownRightCircle, BsArrowRight } from "react-icons/bs"
import { IoCloseCircle, IoAddCircle } from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io";
import RoomGallery from "./roomGallery"
import { LuLogOut } from "react-icons/lu"
import { IoPersonSharp, IoBed } from "react-icons/io5";
import { FaWifi, FaRulerCombined, FaWheelchair } from "react-icons/fa";
import { PiMountainsFill } from "react-icons/pi";
import { GiWoodBeam } from "react-icons/gi";
import { LuGalleryVertical } from "react-icons/lu";

import { useUI } from "@/hooks/contexUi"

export default function RoomLayout({ dictionary, dataRoom, lang, expandBookNav }) {

    const { setRoomInfoActive } = useUI()
    const gallery = dataRoom.gallery.find(g => g.id === 0)
    const router = useRouter()

    // Calculate Next Room
    const rooms = dictionary.dataRooms
    const currentIndex = rooms.findIndex(r => r.slug === dataRoom.slug)
    const nextIndex = (currentIndex + 1) % rooms.length
    const nextRoomSlug = rooms[nextIndex].slug

    const [isInfo, setIsInfo] = useState(null)


    const [bookNavOpen, setBookNavOpen] = useState(true)
    const [bookNavOpenDesk, setBookNavOpenDesk] = useState(false)

    // BookingNav State (Sollevato per sincronizzare le due nav)
    // removed local state, now using context

    // GALLRY STATE MOBILE
    const [isGallery, setIsGallery] = useState(false)
    const hendelGallery = (e) => {
        e.stopPropagation()
        setIsGallery(true)
    }

    //GALLERY DESK
    const [isGalleryDesk, setIsGalleryDesk] = useState(false)
    const hendelGalleryDesk = (e) => {
        e.stopPropagation()
        setIsGalleryDesk(!isGalleryDesk)
    }


    const goldRef = useRef(null)

    // 1. isInGoldZone: Dice solo se siamo scrollati in basso (gestisce la sparizione della nav centrale)
    const [isInGoldZone, setIsInGoldZone] = useState(false)

    // 2. isManuallyClosed: Dice se l'utente ha cliccato la X
    const [isManuallyClosed, setIsManuallyClosed] = useState(false)

    // STATO DESCRIPTION & SERVICE
    const [isDescription, setIsDescription] = useState(true)
    const toggle = (e) => { e.stopPropagation(); setIsDescription(!isDescription) }


    const [isService, setIsService] = useState(false)
    const toggleService = (e) => { e.stopPropagation(); setIsService(!isService) }



    // DATI DINAMICI - PREZZO ROOM DA WORDPRESS
    const [dynamicPrice, setDynamicPrice] = useState(dataRoom.price)

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                console.log("[RoomLayout] Fetching prezzo per:", dataRoom.roomName, "| wpTypeId:", dataRoom.wpTypeId);
                const res = await fetch(`/api/room-price?id=${dataRoom.wpTypeId}`);
                const data = await res.json();
                console.log("[RoomLayout] Risposta API:", data);
                if (data.price) {
                    setDynamicPrice(data.price);
                    console.log(`[RoomLayout] Prezzo aggiornato: ${data.price}`);
                } else {
                    console.warn("[RoomLayout] Nessun prezzo ricevuto, uso fallback:", dataRoom.price);
                }
            } catch (error) {
                console.error("[RoomLayout] Errore fetch prezzo:", error);
            }
        };
        fetchPrice();
    }, [dataRoom.wpTypeId])




    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Aggiorniamo se siamo nella "Zona Gold"
                const isIntersecting = entry.isIntersecting
                setIsInGoldZone(isIntersecting)

                // Se torniamo SU (usciamo dalla zona), resettiamo la chiusura manuale
                // Cosi la prossima volta che scendiamo, il carrello riappare.
                if (!isIntersecting) {
                    setIsManuallyClosed(false)
                }
            },
            { threshold: 0.8 }
        )

        if (goldRef.current) observer.observe(goldRef.current)
        return () => { if (goldRef.current) observer.unobserve(goldRef.current) }
    }, [])

    const handleClose = (e) => {
        e.stopPropagation()
        setIsManuallyClosed(true) // Chiudo il carrello, MA rimango nella GoldZone
    }

    // CALCOLO FINALE: Mostro il carrello solo se sono in zona E non l'ho chiuso
    const shouldShowCart = isInGoldZone && !isManuallyClosed

    useEffect(() => {
        setRoomInfoActive(shouldShowCart || isInfo)
        return () => setRoomInfoActive(false)
    }, [shouldShowCart, isInfo, setRoomInfoActive])

    function PillInfo() {

        const icons = {
            person: <IoPersonSharp />,
            room: <IoBed />,
            wifi: <FaWifi />,
            view: <PiMountainsFill />,
            floor: <GiWoodBeam />,
            mq: <FaRulerCombined />,
            extra: <FaWheelchair />
        }

        return (

            <div
                className={`flex flex-wrap gap-3 justify-center transition-opacity ease-in-out 
                        ? "opacity-0 pointer-events-none duration-0 delay-0"
                        : "opacity-100 pointer-events-auto duration-700 delay-700"
                    }
                    ${!isInfo ? "lg:hidden" : "flex justify-start "}
                    ${!isGalleryDesk ? "" : "hidden"}
                    ${!isInGoldZone ? "" : "hidden"} 
                    `}
            >

                {dataRoom.infoPills.map((item, i) => (
                    <Fragment key={i}>
                        {item.labelOne && item.labelTwo && (
                            <InfoPill className="gap-2 py-2 xs:py-2 md:py-1.5 px-3 xs:px-4 lg:px-3 lg:py-1.5 border-2  border-gold bg-foreground/97 ">
                                {icons[item.idOne]} {item.labelOne}
                                <span className="mx-1">|</span>
                                {icons[item.idTwo]} {item.labelTwo}
                            </InfoPill>
                        )}
                        {item.label && (
                            <InfoPill className="gap-2 py-2 xs:py-2 md:py-1.5 px-3 xs:px-4 lg:px-3 lg:py-1.5 border-2  border-gold  bg-foreground/97">
                                {icons[item.id]} {item.label}{item.id === "mq" ? "m²" : ""}
                            </InfoPill>
                        )}
                    </Fragment>
                ))}
            </div>
        )
    }

    function ServiceDotList() {
        return (
            <ul className={`font-muller mt-4 lg:mt-0 text-sm list-disc pl-5 columns-2 lg:columns-3 gap-8 ${!isService ? "hidden" : "block"}`}>
                {dataRoom.service.service.map((item, index) => (
                    item.trim() !== "" && <li key={index}>{item}</li>
                ))}
            </ul>
        )
    }

    return (

        <BubbleFrame bubbleClass="p-0">
            <div className="w-full h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                {/* Page 1: Room Info */}

                <div className="w-full h-full sticky top-0 snap-start">
                    {!isGalleryDesk ? (
                        <>
                            <SmartBackground
                                srcDesktop={gallery.bkDesk}
                                srcMobile={gallery.bkMobile}
                                alt={gallery.alt}
                            />
                            <div className="flex w-full bg-black/50 inset-0 absolute top-0 left-0" />
                        </>
                    ) : (


                        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center overflow-hidden">
                            <div className="flex flex-col w-full h-full">
                                <RoomGallery
                                    setIsGallery={setIsGallery}
                                    dataRoom={dataRoom}
                                    dictionary={dictionary}
                                    lang={lang} />
                            </div>
                        </div>





                    )}

                    <div className="flex w-full h-full bg-black/30 relative" />

                    <div className={`flex absolute top-0 left-0 w-full h-full items-center justify-center z-20 transition-all duration-500 
                                    
                                    ${!shouldShowCart ? "" : "items-start justify-start"}
                                    ${!isInfo ? "" : "justify-start items-start p-7"}
                                     ${!isGalleryDesk ? "" : ""}
                        `}>

                        {/* CONTENUTO CENTRALE (Titolo, Pills, ecc) */}
                        <div className={`flex flex-col w-auto xs:w-100 md:w-150 lg:w-min items-center gap-10 mt-[-150px] lg:mt-0 
                                        ${!isInGoldZone ? "" : "items-start px-4 mt-[0px]"}
                                        ${!isInfo ? "" : "items-start"}
                                        ${!isGalleryDesk ? "" : ""}
                                        
                                        `}>
                            {/* PAYOFF ROOM NAME  */}
                            <div className={`flex flex-col gap-3 items-center lg:items-start
                                        ${!isGalleryDesk ? "" : "opacity-80 gap-1 "}`}>

                                <p className={`${!isGalleryDesk ? "" : "hidden"}
                                                ${!isInGoldZone ? "" : "hidden"}
                                `}>
                                    {dataRoom.roomSubName}
                                </p>

                                <MasterTitle>
                                    <span className={`transition-all duration-500 w-min text-center lg:text-nowrap block
                                    ${!isInGoldZone ? "" : "mt-4 text-3xl text-left"} 
                                    ${!isInfo ? "" : "text-6xl w-20 lg:w-fit text-nowrap"}
                                    ${!isGalleryDesk ? "" : "text-xl"}
                                    `}>
                                        {dataRoom.roomName}
                                    </span>
                                </MasterTitle>

                            </div>

                            {/* BUTTON ACCES ROOM DESK */}
                            <BtnBase onClick={() => setIsInfo(!isInfo)}
                                className={`transition-all duration-300 hidden lg:flex hover:bg-gold shadow-xl border-2 border-gold ${!isInfo ? "" : "lg:hidden"}`}
                                textClassName="group-hover:text-foreground transition-all duration-300 "
                            >
                                {dictionary.assetUi.entryRoom}
                            </BtnBase>

                            <PillInfo />

                            {/* PILL INFO ALL SERVICE ONLY FOR DESK */}
                            {isInfo && !isGalleryDesk && (
                                <Fragment>
                                    {/* SERIVE BTN DESK */}
                                    <div className="flex-col gap-1 mt-[-20] hidden lg:flex ">
                                        <InfoPill onClick={toggleService} className={`gap-2 py-2 xs:py-2 md:py-1.5 px-3 xs:px-4 lg:px-3 lg:py-1.5 items-center transition-all duration-300 cursor-pointer hover:bg-gold ${isService ? "w-120 justify-center" : ""}`}>
                                            <IoMdAddCircle size={15} className={`${!isService ? "" : "rotate-45 transition-transform duration-300"}`} />
                                            {dataRoom.service.label}
                                        </InfoPill>
                                        <AnimatePresence>
                                            {isService && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0, y: 10 }}
                                                    animate={{ height: "auto", opacity: 1, y: 0 }}
                                                    exit={{ height: 0, opacity: 0, y: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="w-120 bg-gold rounded-xl overflow-hidden shadow-lg"
                                                >
                                                    <div className="flex p-3">
                                                        <ServiceDotList />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>


                                    <div className="gap-1 items-start hidden lg:flex">
                                        {/* BUTTON OPEN CLOSE DESCRIPTION DESK */}
                                        <InfoPill className={`[writing-mode:vertical-rl] gap-2 items-center py-2 xs:py-2 md:py-3 px-3 xs:px-4 lg:px-3 lg:py-1.5 cursor-pointer hover:bg-gold hover:text-foreground
                                                    ${!isDescription ? "" : ""}`}
                                            onClick={toggle}>
                                            <BsArrowDownRightCircle size={15} className={`rotate-90 ${!isDescription ? "" : "-rotate-90"}`} />
                                            {!isDescription ? dictionary.assetUi.descriptionOpen : dictionary.assetUi.descriptionClose}
                                        </InfoPill>
                                        {/* DESCRIPTION DESK */}
                                        <AnimatePresence>
                                            {isDescription && (
                                                <motion.div
                                                    initial={{ width: 0, opacity: 0, x: -10 }}
                                                    animate={{ width: "auto", opacity: 1, x: 0 }}
                                                    exit={{ width: 0, opacity: 0, x: -10 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="bg-gold lg:bg-gold/55 rounded-xl overflow-hidden shadow-xl"
                                                >
                                                    <div className="w-110 flex p-5">

                                                        <p className="font-muller whitespace-pre-line md:text-base lg:text-sm">
                                                            {dataRoom.description}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </Fragment>
                            )}
                        </div>

                        {/* NAVBAR NEXT ROOM _ BOOKK ECC DESK */}
                        {isInfo && (
                            <AnimatePresence>

                                <motion.div
                                    initial={{ width: 0, opacity: 0, x: -10 }}
                                    animate={{ width: "auto", opacity: 1, x: 0 }}
                                    exit={{ width: 0, opacity: 0, x: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-gold rounded-xl overflow-hidden hidden lg:flex"
                                >
                                    <div className={`flex w-full  justify-between px-10 absolute bottom-15 left-0
                                                    ${!bookNavOpenDesk ? "" : "justify-end"}
                                                    ${isGalleryDesk ? "pointer-events-none" : ""}`}>
                                        {/* NEXT ROOM */}

                                        <BtnBase onClick={() => router.push(`/${lang}/camere/${nextRoomSlug}`)}
                                            className={` ${!isGalleryDesk ? "" : "hidden"}
                                                        ${!bookNavOpenDesk ? "" : "hidden"}
                                            `}
                                            iconEnd={BsArrowRight}
                                            btnClass={`hover:bg-gold transition-all duration-300`}
                                            textClassName="group-hover:text-foreground transition-all duration-300"
                                            iconClassName={`group-hover:animate-pulse`}
                                        >
                                            {dictionary.assetUi.nextRoom}
                                        </BtnBase>

                                        {/* GALLEY */}
                                        <BtnBase onClick={hendelGalleryDesk}
                                            className={`hover:bg-gold ${!bookNavOpenDesk ? "" : "hidden"} ${isGalleryDesk ? "pointer-events-auto" : ""}`}
                                            textClassName={`group-hover:text-foreground`}
                                            iconStart={!isGalleryDesk ? LuGalleryVertical : LuLogOut}
                                            iconClassName={`${isGalleryDesk ? "rotate-180" : ""}`}>
                                            {!isGalleryDesk ? dictionary.assetUi.gallery : dictionary.assetUi.exit}
                                        </BtnBase>

                                        <div className="flex gap-3">
                                            {/* PRICE */}
                                            <BtnBase className={`bg-golden ${!isGalleryDesk ? "" : "hidden"}`}
                                                textClassName="text-foreground">
                                                Da €{dynamicPrice},00 /{dictionary.assetUi.night}
                                            </BtnBase>
                                            {/* BOOKNAV */}
                                            <BookingNav
                                                dictionary={dictionary}
                                                lang={lang}
                                                bookNavOpen={bookNavOpenDesk}
                                                setBookNavOpen={setBookNavOpenDesk}
                                                expandBookNav={(e) => { e.stopPropagation(); setBookNavOpenDesk(true) }}
                                                room={dataRoom}
                                                navClass={`${isGalleryDesk ? "pointer-events-auto" : ""}`}
                                            />
                                        </div>
                                    </div>
                                </motion.div>

                            </AnimatePresence>
                        )}
                    </div>

                    {/* LAYOUT MOBILE */}
                    {/* --- PRIMA BOOKING NAV (Quella centrale che sparisce) --- */}
                    {/* FIX: Usiamo isInGoldZone. Se scendo, questa sparisce SEMPRE, anche se chiudo il carrello sotto. */}
                    <motion.div
                        className="flex flex-col px-5 xs:px-7 md:px-30 gap-3 w-full absolute bottom-37 xs:bottom-53 md:bottom-20 left-1/2 -translate-x-1/2 justify-center lg:hidden z-99"
                        animate={{
                            opacity: isInGoldZone ? 0 : 1,
                            pointerEvents: isInGoldZone ? "none" : "auto"
                        }}
                        transition={{ duration: 0.5 }}
                    >

                        {/* BTN GALLERY */}
                        <BtnBase onClick={hendelGallery} className="bg-black border-1 border-gold/40 " textClassName="text-foreground" iconStart={LuGalleryVertical} iconClassName="text-goldr">
                            {dictionary.assetUi.gallery}
                        </BtnBase>

                        <BookingNav
                            dictionary={dictionary}
                            lang={lang}
                            bookNavOpen={bookNavOpen}
                            setBookNavOpen={setBookNavOpen}
                            expandBookNav={expandBookNav}
                            alwaysOpen={true}
                            room={dataRoom}
                        />



                    </motion.div>
                </div>


                {/* LAYOUT MOBILE */}
                {/* --- SECONDA BOOKING NAV (Il Carrello Gold) --- */}
                <div
                    ref={goldRef}
                    className="flex flex-col justify-end w-full h-screen snap-start z-40 rounded-3xl xl:rounded-[40px] pointer-events-none lg:hidden"
                >
                    {/* Sfondo Gold Separato */}
                    <motion.div
                        className="absolute inset-0 rounded-3xl xl:rounded-[40px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: shouldShowCart ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                    />

                    {/* Contenuto Reale */}
                    <AnimatePresence>
                        {shouldShowCart && (
                            <motion.div
                                key="gold-content"
                                className="relative w-full h-fit p-4 flex flex-col items-center pb-20 xs:pb-33 md:pb-0 md:px-15 pointer-events-none bg-gold rounded-3xl xl:rounded-[40px]"
                                initial={{ y: 100, opacity: 0 }}
                                animate={{
                                    y: 0, opacity: 1,
                                    transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.1 }
                                }}
                                exit={{
                                    y: 50, opacity: 0, height: 0,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                {/* HEADER DEL CARRELLO: Nav + Icona Chiudi */}
                                <div className="flex w-full  justify-between items-start pointer-events-auto z-50 md:mb-7">
                                    {/* Wrapper per centrare la nav e avere la X a destra */}
                                    <div className="flex justify-center">
                                        <BookingNav
                                            dictionary={dictionary}
                                            lang={lang}
                                            expandBookNav={expandBookNav}
                                            classBtnBooktoNavBook={`bg-black`}
                                            navClass={`pointer-events-auto items-start`}
                                            alwaysOpen={true}
                                            room={dataRoom}
                                        />
                                    </div>

                                    {/* ICONA CHIUSURA */}
                                    {/* <div className="ml-2 mt-2 cursor-pointer text-white/80 hover:text-white transition-colors" onClick={handleClose}>
                                        <IoCloseCircle size={35} />
                                    </div> */}
                                </div>

                                {/* INFO & DESCRIPTION  */}
                                <div className={`w-full pointer-events-auto  ${!isDescription && !isService ? "flex gap-7" : "flex-col"}`}>

                                    {/* DESCRIPTION */}
                                    <InfoPill className=" mt-7 gap-2 items-center text-balance" type="button" onClick={toggle}>
                                        {!isDescription ? dictionary.assetUi.descriptionOpen : dictionary.assetUi.descriptionClose}
                                        <BsArrowDownRightCircle size={15} className={`${!isDescription ? "" : "rotate-270"}`} />
                                    </InfoPill>

                                    <p className={`font-muller mt-7 whitespace-pre-line text-xs xs:text-sm text-balance ${!isDescription ? "hidden" : "flex"}`}>
                                        {dataRoom.description}
                                    </p>
                                    {/* SERVICE*/}
                                    <InfoPill className=" mt-7 gap-2 items-center" type="button" onClick={toggleService}>
                                        <IoMdAddCircle size={15} className={`${!isService ? "" : "rotate-45 transition-transform duration-300"}`} />
                                        {dataRoom.service.label}
                                    </InfoPill>

                                    {isService && <ServiceDotList />}
                                </div>

                                {/* PRICE & NEXT */}
                                <div className="flex w-full gap-3 mt-10 pointer-events-auto">
                                    <BtnBase className="bg-background" textClassName="text-foreground">
                                        Da €{dynamicPrice},00 /{dictionary.assetUi.night}
                                    </BtnBase>
                                    <BtnBase onClick={() => router.push(`/${lang}/camere/${nextRoomSlug}`)}
                                        iconEnd={BsArrowRight}>
                                        {dictionary.assetUi.nextRoom}
                                    </BtnBase>
                                </div>

                                <div className="h-20 xs:h-25 shrink-0" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {
                isGallery && (
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center lg:hidden">
                        <div className={`flex flex-col w-full h-full  pb-5 lg:pb-0 gap-2 !pb-0
                                                                     `}>
                            <RoomGallery
                                setIsGallery={setIsGallery}
                                dataRoom={dataRoom}
                                dictionary={dictionary}
                                lang={lang} />
                        </div>
                    </div>
                )
            }

        </BubbleFrame >
    )





}