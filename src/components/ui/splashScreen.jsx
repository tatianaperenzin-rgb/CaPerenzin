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
        // Lock and show
        document.body.style.overflow = "hidden"
        // }
    }, [])

    const handleComplete = () => {
        // Unlock scroll and set session
        setTimeout(() => {
            setShow(false)
            document.body.style.overflow = ""
            sessionStorage.setItem("splashShown", "true")
        }, 300)
    }

    return (

        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="fixed inset-0 z-99999 flex flex-col items-center justify-center bg-background text-foreground"
                >
                    <div className="flex flex-col items-center gap-6">
                        <div className="relative">
                            <MasterTitle className="opacity-30 text-foreground">
                                {dictionary.assetUi.splashScreen.title}
                            </MasterTitle>
                            <motion.div
                                className="absolute top-0 left-0 overflow-hidden text-gold whitespace-nowrap"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                onAnimationComplete={handleComplete}
                            >
                                <MasterTitle>
                                    {dictionary.assetUi.splashScreen.title}
                                </MasterTitle>
                            </motion.div>
                        </div>

                        <p className="text-xs md:text-sm text-foreground/70 tracking-widest text-center uppercase">
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
