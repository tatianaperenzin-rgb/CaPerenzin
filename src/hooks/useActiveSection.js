"use client"
import { useState, useEffect, useRef } from 'react'

export default function UseActiveSection(sectionID, options = {}) {


    const [activeID, setActiveID] = useState("")

    const observer = useRef(null)

    useEffect(() => {
        const observed = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0,
            ...options
        }
        observed.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entries.Intersecting) {
                    setActiveID(entry.target.id)
                }
            })
        }, observerOptions)

        // Diciamo all'observer quali elementi (ID) osservare
        sectionIds.forEach((id) => {
            const element = document.getElementById(id)
            if (element) observer.current.observe(element)
        })

        // Pulizia quando il componente viene smontato
        return () => {
            if (observer.current) observer.current.disconnect()
        }
    }, [sectionIds, optionsId])

    return activeID
}