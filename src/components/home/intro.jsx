"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import BubbleFrame from "@/components/ui/bubbleFrame"
import MasterTitle from "@/components/ui/typography/masterTitle"
import SmartBackround from "@/components/image/smartBackround"
import BtnBase from "@/components/ui/btnBase"
import BookingNav from "@/components/ui/booking/bookingNav"
import { BsArrowDownRightCircle } from "react-icons/bs"
import { useUI } from "@/hooks/contexUi"

export default function Intro({ dictionary, lang }) {

    const [bookNavOpen, setBookNavOpen] = useState(false)
    const { isLargeView, setIsLargeView } = useUI()

    const expandBookNav = () => {
        setBookNavOpen(!bookNavOpen)
        console.log("CLIK", bookNavOpen)
    }

    const hendelView = () => {
        setIsLargeView(true)
    }


    return (
        <BubbleFrame id="home" color="bg-transaprent" tag="section">
            <SmartBackround
                srcMobile={dictionary.hero.srcMobile}
                srcDesktop={dictionary.hero.srcDesk}
                alt={dictionary.hero.scrAlt}

            />
            <div className="flex w-full bg-black/50 inset-0 absolute top-0 left-0" />

            {/*  NAME B&B TITLE */}
            <motion.div
                layout
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className={`flex flex-col w-full h-svh lg:h-dvh absolute justify-center items-center
                            pb-40 lg:pb-0 transition-all duration-500
                            ${!isLargeView ? " justify-center items-center" : " justify-start items-start"}
                            `}>
                <MasterTitle className={`${!isLargeView ? "" : "md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl md:p-5 lg:p-4"}`}>

                    <motion.span layout>{dictionary.hero.BeBname}</motion.span>

                </MasterTitle>

                {/* FIRST TEXT UNDER TITLE */}
                <h2 className={`
                        font-bold text-center md:text-balance
                        w-70 xs:w-100 md:w-auto
                        en:w-90 xs:en:w-md md:en:w-auto lg:en:w-auto
                        mt-3
                        leading-5 xs:leading-6
                        text-sm it:xs:text-xl en:xs:text-lg
                                it:md:text-xl en:md:text-xl
                                it:lg:text-2xl
                                it:2xl:text-3xl
                                                en:lg:text-xl
                                                en:2xl:text-3xl
                        
                        
                        
                       
                        max-h-0 overflow-hidden opacity-0 animateDelay
                         ${!isLargeView ? "" : "hidden"}
                       `} style={{ animationDelay: '600ms' }}>
                    {dictionary.hero.heroIntroOne}
                </h2>

                {/* SECOND TEXT UNDER TITLE */}
                <p className={`text-center font-muller text-balance
                        mt-10 lg:mt-6
                        it:w-80 it:xs:w-90 it:md:w-xl it:lg:w-180 it:xl:w-auto 
                        en:w-70 en:xs:w-100 en:md:w-xl en:lg:w-220  en:xl:w-auto 
                        text-sm xs:text-base md:text-xl it:lg:text-lg it:xl:text-lg
                        en:lg:text-xl it:2xl:text-2xl en:2xl:text-2xl
                        max-h-0 overflow-hidden opacity-0
                        animateDelay
                        ${!isLargeView ? "" : "hidden"}
                        `}
                    style={{ animationDelay: '1500ms' }}>
                    {dictionary.hero.heroIntroTwo}
                </p>

                {/* CONTENT AFTER BRA (btn respira) */}
                <AnimatePresence>
                    {isLargeView && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="flex w-full lg:h-[86vh] xl:h-[86vh] 2xl:h-[85vh]  md:p-5 lg:p-4  justify-between items-end ">

                            <div className="flex flex-col gap-3 ">
                                <h2 className="font-black text-xl lg:w-60">
                                    {dictionary.hero.heroOpen.headline}
                                </h2>

                                <p className="font-muller text-md lg:w-70 xl:w-2/3 text-balance leading-tight">
                                    {dictionary.hero.heroOpen.content}
                                </p>
                            </div>

                            <div className="flex flex-col gap-2  items-end pe-2">
                                <p className="font-muller text-md lg:w-50 xl:w-2/3 text-right leading-tight">
                                    {dictionary.hero.heroOpen.textLeft}
                                </p>
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.div>

            {/* BLOCK BTN CTA */}
            <div className={`flex w-screen absolute
                             h-20 items-center justify-center
                             bottom-7 xs:bottom-12 md:bottom-10 lg:bottom-5
                             left-1/2 -translate-x-1/2
                            gap-5`}>
                <BtnBase
                    onClick={hendelView}

                    iconEnd={BsArrowDownRightCircle}
                    className={`hidden lg:flex hover:bg-gold transition-all duration-300
                            ${!isLargeView ? "" : "lg:hidden"}
                            ${!bookNavOpen ? "" : "lg:hidden"}
                            `}
                    textClassName={`group-hover:text-foreground transition-all duration-300`}
                >
                    {dictionary.hero.ctaHome}
                </BtnBase>

                <BookingNav
                    dictionary={dictionary}
                    lang={lang}
                    bookNavOpen={bookNavOpen}
                    setBookNavOpen={setBookNavOpen}
                    expandBookNav={expandBookNav}
                />
            </div>
        </BubbleFrame>

    )
}
