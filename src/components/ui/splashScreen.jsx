"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MasterTitle from "@/components/ui/typography/masterTitle"

export default function SplashScreen({ dictionary }) {
    const [show, setShow] = useState(true)

    useEffect(() => {
        // Check session storage
        // const hasShown = typeof window !== "undefined" ? sessionStorage.getItem("splashShown") : null
        // if (hasShown) {
        //     setShow(false)
        // } else {
        // Lock and show both the body and the html level to forcefully prevent lateral native scrollbars
        document.body.style.overflow = "hidden"
        document.documentElement.style.overflow = "hidden"
        // }

        return () => {
            document.body.style.overflow = ""
            document.documentElement.style.overflow = ""
        }
    }, [])

    const handleComplete = () => {
        // Unlock scroll and set session
        setTimeout(() => {
            setShow(false)
            document.body.style.overflow = ""
            document.documentElement.style.overflow = ""
            sessionStorage.setItem("splashShown", "true")
        }, 270)
    }

    return (

        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="fixed inset-0 z-99999 flex flex-col items-center justify-center bg-background text-foreground overflow-hidden"
                >
                    <div className="flex flex-col items-center gap-6 overflow-hidden">
                        <div className="relative">
                            <MasterTitle tag="div" className="opacity-30 text-foreground">
                                {dictionary.assetUi.splashScreen.title}
                            </MasterTitle>
                            <motion.div
                                className="absolute top-0 left-0 overflow-hidden text-gold whitespace-nowrap"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                onAnimationComplete={handleComplete}
                            >
                                <MasterTitle tag="div">
                                    {dictionary.assetUi.splashScreen.title}
                                </MasterTitle>
                            </motion.div>
                        </div>

                        <p className="px-7 xxs:px-20 text-balance text-[10px] md:text-sm text-foreground/70 tracking-widest text-center uppercase overflow-hidden">
                            {dictionary.assetUi.splashScreen.text}
                        </p>

                        {/* Progress Bar Container */}
                        {/* <div className="w-48 md:w-64 h-[2px] bg-white/10 rounded-full mt-4 overflow-hidden">
                            <motion.div
                                className="h-full bg-gold"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                onAnimationComplete={handleComplete}
                            />
                        </div> */}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
