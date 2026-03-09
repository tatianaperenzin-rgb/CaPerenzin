"use client"

import BubbleFrame from "@/components/ui/bubbleFrame"
import MasterTitle from "@/components/ui/typography/masterTitle"
import SmartBackround from "@/components/image/smartBackround"
import { motion } from "framer-motion"

export default function SectionE({ dictionary, lang, startAnimation }) {
    return (
        <BubbleFrame id="home" color="bg-transaprent" tag="section">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: startAnimation ? 1 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: startAnimation ? 0.8 : 0 }}
                className="absolute inset-0 w-full h-full z-0"
            >
                <SmartBackround
                    srcMobile={dictionary.srcMobile}
                    srcDesktop={dictionary.srcDesk}
                    alt={dictionary.srcAlt}
                />
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: startAnimation ? 1 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: startAnimation ? 0.8 : 0 }}
                className="flex w-full bg-black/50 inset-0 absolute top-0 left-0"
            />
            <section className="flex w-full h-[70vh] lg:h-dvh items-center justify-center z-20">
                <div className="flex flex-col gap-3 xl:gap-8">
                    <p className="text-xs xs:text-sm md:text-base lg:text-lg xl:text-xl
                                xl:ms-[-70px]">
                        {dictionary.upTitle}
                    </p>
                    <MasterTitle className="w-min text-balance opacity-70" tag="h2">
                        {dictionary.title}
                    </MasterTitle>
                </div>
            </section>
        </BubbleFrame>
    )
}