"use client"

import FullScreenLoader from "@/components/ui/fullScreenLoader"
import { useParams } from "next/navigation"

export default function Loading() {
    const { lang } = useParams()
    return <FullScreenLoader label={lang === 'it' ? "Scopri cosa ti aspetta..." : "Discover what awaits you..."} />
}
