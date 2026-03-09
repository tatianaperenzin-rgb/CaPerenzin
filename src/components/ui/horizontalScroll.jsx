"use client"
import React, { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function HorizontalScroll({ children }) {
    const containerRef = useRef(null)
    const sliderRef = useRef(null)

    const [containerHeight, setContainerHeight] = useState(0)
    const [slideWidth, setSlideWidth] = useState(0)

    useEffect(() => {
        // Al montaggio, calcoliamo la larghezza viewport corretta (senza scrollbar)
        setSlideWidth(document.documentElement.clientWidth)
    }, [])

    useEffect(() => {
        const DELAY = 150

        const handleScroll = () => {
            if (!containerRef.current || !sliderRef.current) return

            const containerTop = containerRef.current.offsetTop
            const scrollY = window.scrollY

            const distFromTop = scrollY - containerTop
            let scrollPos = distFromTop - DELAY

            if (scrollPos < 0) scrollPos = 0

            // Usiamo clientWidth (viewport senza scrollbar)
            const viewWidth = document.documentElement.clientWidth
            const maxHorizontalScroll = sliderRef.current.scrollWidth - viewWidth

            if (scrollPos > maxHorizontalScroll) scrollPos = maxHorizontalScroll

            sliderRef.current.style.transform = `translate3d(-${scrollPos}px, 0, 0)`
        }

        const calcDimensions = () => {
            if (sliderRef.current) {
                const viewWidth = document.documentElement.clientWidth
                setSlideWidth(viewWidth)

                const childCount = React.Children.count(children)
                // Larghezza totale = numero di slide * larghezza viewport
                const objectWidth = childCount * viewWidth
                const windowHeight = window.innerHeight

                // Formula altezza totale
                const totalHeight = (objectWidth - viewWidth) + windowHeight + DELAY
                setContainerHeight(totalHeight)
            }
        }

        calcDimensions()
        window.addEventListener("scroll", handleScroll)
        window.addEventListener("resize", calcDimensions)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", calcDimensions)
        }
    }, [children])

    const childrenWithWidth = React.Children.map(children, child => (
        <div
            style={{ width: slideWidth ? `${slideWidth}px` : '100vw' }}
            className="h-full flex-shrink-0"
        >
            {child}
        </div>
    ))

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            className="w-full relative"
            style={{ height: `${containerHeight}px` }}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
                <div
                    ref={sliderRef}
                    className="flex w-fit h-full will-change-transform"
                >
                    {childrenWithWidth}
                </div>
            </div>
        </motion.div>
    )
}