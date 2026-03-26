'use client'

import { useEffect, useMemo } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'

const SCRIPT_SRC_BASE = 'https://app.termly.io'

export default function TermlyCMP({ autoBlock, masterConsentsOrigin, websiteUUID }) {
    const scriptSrc = useMemo(() => {
        const src = new URL(SCRIPT_SRC_BASE)
        src.pathname = `/resource-blocker/${websiteUUID}`
        if (autoBlock) {
            src.searchParams.set('autoBlock', 'on')
        }
        if (masterConsentsOrigin) {
            src.searchParams.set('masterConsentsOrigin', masterConsentsOrigin)
        }
        return src.toString()
    }, [autoBlock, masterConsentsOrigin, websiteUUID])

    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        // Safe check se lo script ha terminato di caricarsi e re-inizializziamo qualora serva (Next.js Navigation)
        if (typeof window !== 'undefined' && window.Termly) {
            window.Termly.initialize?.()
        }
    }, [pathname, searchParams])

    return (
        <Script
            src={scriptSrc}
            strategy="afterInteractive"
        />
    )
}