"use client"
import { useState, useEffect } from "react";

export default function DataLive({ dictionary, lang }) {

    const [year, setYear] = useState(new Date().getFullYear())

    useEffect(() => {
        setYear(new Date().getFullYear())
    }, []);

    return (
        <span>
            © {year} {dictionary.copyright}
        </span>
    )
}
