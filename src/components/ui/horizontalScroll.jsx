"use client"
import React, { useRef, useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"

export default function HorizontalScroll({ children }) {
    const containerRef = useRef(null)
    const sliderRef = useRef(null)

    const [containerHeight, setContainerHeight] = useState(0)
    const [slideWidth, setSlideWidth] = useState(0)

    useEffect(() => {
        setSlideWidth(document.documentElement.clientWidth)
    }, [])

    // Dopo il mount, nascondi i wrapper vuoti generati da Next.js RSC serialization
    useEffect(() => {
        if (!sliderRef.current) return
        const wrappers = sliderRef.current.children
        for (const wrapper of wrappers) {
            // Se il wrapper non ha nessun element child visibile, nascondilo
            if (wrapper.children.length === 0 || wrapper.innerHTML.trim() === '') {
                wrapper.style.display = 'none'
            }
        }
    })

    const calcDimensions = useCallback(() => {
        if (!sliderRef.current) return

        const viewWidth = document.documentElement.clientWidth
        setSlideWidth(viewWidth)

        // Conta solo i wrapper visibili (non nascosti)
        const visibleWrappers = Array.from(sliderRef.current.children)
            .filter(w => w.style.display !== 'none')
        const childCount = visibleWrappers.length

        const DELAY = 150
        const objectWidth = childCount * viewWidth
        const windowHeight = window.innerHeight
        const totalHeight = (objectWidth - viewWidth) + windowHeight + DELAY
        setContainerHeight(totalHeight)
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

            const viewWidth = document.documentElement.clientWidth
            const maxHorizontalScroll = sliderRef.current.scrollWidth - viewWidth

            if (scrollPos > maxHorizontalScroll) scrollPos = maxHorizontalScroll

            sliderRef.current.style.transform = `translate3d(-${scrollPos}px, 0, 0)`
        }

        // Ritarda il calcolo dimensioni per aspettare che i wrapper vuoti siano nascosti
        const timer = setTimeout(() => calcDimensions(), 100)

        window.addEventListener("scroll", handleScroll)
        window.addEventListener("resize", calcDimensions)

        return () => {
            clearTimeout(timer)
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", calcDimensions)
        }
    }, [children, calcDimensions])

    const childrenWithWidth = React.Children.map(children, (child, i) => (
        <div
            key={i}
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
            className="w-full relative h-dvh"
            style={containerHeight ? { height: `${containerHeight}px` } : undefined}
        >
            <div className="sticky top-0 h-dvh w-full overflow-hidden flex items-center">
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