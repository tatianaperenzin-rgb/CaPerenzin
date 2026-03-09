"use client"
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import SectionE from '@/components/home/sectionE'
import SectionF from '@/components/home/sectionF'

export default function SectionEF({ dictionary, lang }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { amount: 0.3, once: false })

    return (
        <div>
            <div ref={ref}>
                <SectionE
                    dictionary={dictionary.sectionE}
                    lang={lang}
                    startAnimation={isInView}
                />
            </div>
            <SectionF
                dictionary={dictionary.sectionF}
                lang={lang}
            />
        </div>
    )
}
