"use client"

import BubbleFrame from "@/components/ui/bubbleFrame"
import MasterTitle from "@/components/ui/typography/masterTitle"
import SmartBackround from "@/components/image/smartBackround"
import { motion } from "framer-motion"

export default function SectionI({ dictionary, lang, startAnimation }) {
    return (
        <BubbleFrame id="magic" color="bg-transparent" tag="section">
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
                className="flex w-full bg-black/70 inset-0 absolute top-0 left-0"
            />
            <section className="flex w-full h-[60vh] lg:h-dvh items-center justify-center z-20">
                <div className="flex">
                    <MasterTitle className="text-balance w-min whitespace-normal
                                    text-4xl xs:text-5xl md:text-7xl lg:text-8xl xl:text-8xl 2xl:text-9xl" tag="h2">
                        {lang === "it"
                            ? dictionary.headline.replace("un mondo", "un\u00A0mondo")
                            : dictionary.headline
                                .replace("the gate", "the\u00A0gate")
                                .replace("of magic", "of\u00A0magic")
                        }
                    </MasterTitle>
                </div>
            </section>
        </BubbleFrame>
    )
}