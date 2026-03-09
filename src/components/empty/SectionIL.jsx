"use client"
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import SectionI from '@/components/home/sectionI'
import SectionL from '@/components/home/sectionL'

export default function SectionIL({ dictionary, lang }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { amount: 0.3, once: false })

    return (
        <div>
            <div ref={ref}>
                <SectionI
                    dictionary={dictionary.sectionI}
                    lang={lang}
                    startAnimation={isInView}
                />
            </div>
            <SectionL
                dictionary={dictionary.sectionL}
                lang={lang}
            />
        </div>
    )
}
