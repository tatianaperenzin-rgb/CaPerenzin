"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import BtnBase from "../ui/btnBase"
import MasterTitle from "../ui/typography/masterTitle"
import { FaInstagram } from "react-icons/fa"
import { FaFacebook } from "react-icons/fa"
import { Icon } from '@iconify/react'
import DataLive from "../ui/dataLive"
import BookingNav from "../ui/booking/bookingNav"

export default function SectionO({ dictionary, lang, bookingDictionary }) {

    const [isBookingOpen, setIsBookingOpen] = useState(false)

    useEffect(() => {
        if (isBookingOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [isBookingOpen])


    const Menu = () => {

        return (
            <div className="flex flex-col xl:gap-2">
                {dictionary.menu.map((item, i) => {

                    const commonClass = "font-bold text-2xl 2xl:text-3xl hover:text-gold transition-all duration-300 cursor-pointer w-fit"

                    return (
                        <div key={item} className="flex flex-col">
                            {i === 0 && (
                                <Link href={`/${lang}/#room`} className={commonClass}>
                                    {item}
                                </Link>
                            )}
                            {i === 1 && (
                                <Link href={`/${lang}/experiences`} className={commonClass}>
                                    {item}
                                </Link>
                            )}
                            {i === 2 && (
                                <button onClick={() => setIsBookingOpen(true)} className={commonClass}>
                                    {item}
                                </button>
                            )}
                        </div>
                    )
                })}
            </div>
        )
    }

    const extra = {
        maps: (props) => <Icon icon="logos:google-maps" width="48.83" height="70" {...props} />,
    }

    const textClass = "font-muller text-xs xs:text-base "
    const policyClass = "font-muller text-xs xs:text-sm "
    const copyright = "font-muller text-xs text-gold xs:text-sm"
    const hoverIcon = "hover:text-gold transition-all duration-300 cursor-pointer"

    const AgencyTag = () => <p className={copyright}> Powered By <a className="hover:underline transition-all duration-300" href="https://digitalmedias.it/" target="_blank">{dictionary.agency}</a></p>


    return (
        <footer className="flex flex-col h-[100vh] mt-20 rounded-3xl xl:rounded-[40px] lg:h-dvh relative z-30 bg-background p-7 justify-end gap-15 md:p-20 pb-15 xs:pb-30">

            <div className="flex flex-col md:w-fit xl:hidden ">
                <MasterTitle className="py-7  xl:text-9xl" tag="div">
                    {dictionary?.headline}
                </MasterTitle>

                {/* LAYOUT SMARTPHONE */}
                <div className="flex md:mt-40 justify-between">

                    <div className="flex flex-col gap-5">

                        {/* CONTACT */}
                        <div className="flex flex-col gap-1">
                            <p className={`${textClass}`}>
                                {dictionary.adress}
                            </p>
                            <Link href={`/${lang}/contact`} className={`${textClass} hover:text-gold transition-all duration-300 w-fit block`}>
                                {dictionary.mail}
                            </Link>
                            <a href={`tel:${dictionary.cell}`} className={`${textClass} hover:text-gold transition-all duration-300 w-fit block`}>
                                {dictionary.cell}
                            </a>
                            <a href={`tel:${dictionary.cellTwo}`} className={`${textClass} hover:text-gold transition-all duration-300 w-fit block`}>
                                {dictionary.cellTwo}
                            </a>
                        </div>

                        {/* MINI MENU VOICE */}
                        <div className="py-3">
                            <Menu />
                        </div>


                        <div className="flex flex-col gap-1">
                            <p className={`${textClass}`}>
                                {dictionary.pIva}
                            </p>
                            <p className={`${textClass}`}>
                                {dictionary.CIN}
                            </p>

                            <p className={`${textClass}`}>
                                {dictionary.regionalText}
                            </p>
                        </div>

                        <div className="mt-7 xl:hidden">
                            <BtnBase
                                iconEnd={extra.maps}
                                href={dictionary.assetUi.navigatorBeB.gMaps}
                                className="border-2 border-transparent border-t-[#4285F4] border-r-[#EA4335] border-b-[#FBBC05] border-l-[#34A853] transition-all duration-300"

                            >
                                {dictionary.assetUi.navigatorBeB.label}
                            </BtnBase>
                        </div>
                    </div>

                    {/* COLUM TABLET */}
                    <div className="hidden md:flex flex-col gap-10">

                        <div className="mt-7 hidden xl:block">
                            <BtnBase iconEnd={extra.maps}
                                href={dictionary.assetUi.navigatorBeB.gMaps}
                                className="border-2 border-transparent border-t-[#4285F4] border-r-[#EA4335] border-b-[#FBBC05] border-l-[#34A853] transition-all duration-300">
                                {dictionary.labelBtn}
                            </BtnBase>
                        </div>
                        {/* SOCIAL */}
                        <div className="flex flex-col gap-3">
                            <p className="">
                                {dictionary.titleSocial}
                            </p>
                            {/* ICONS */}
                            <div className="flex gap-2">
                                <FaInstagram size={30} className={hoverIcon} />
                                <FaFacebook size={30} className={hoverIcon} />
                            </div>
                        </div>

                        {/* POLICY BTN */}
                        <div className="flex flex-col">
                            <p className={policyClass}>
                                {dictionary.cookie}
                            </p>
                            <Link href={`/${lang}/policy`} target="_blank" className={`${policyClass} hover:text-gold transition-all duration-300 block`}>
                                {dictionary.policy}
                            </Link>
                            <Link href={`/${lang}/termsofuse`} target="_blank" className={`${policyClass} hover:text-gold transition-all duration-300 block`}>
                                {dictionary.terms}
                            </Link>
                        </div>

                        {/* COPIRIGHT */}
                        <div className={`flex flex-col ${textClass}`}>

                            <p className={copyright}>
                                <DataLive dictionary={dictionary} />
                            </p>

                            {/* <p className={copyright}>
                                Design & Coding: {dictionary.design}
                            </p> */}

                            <AgencyTag />
                        </div>
                    </div>
                </div>
            </div>



            {/* CONTINUE LAYOUT SMARTPHONE */}
            <div className="flex flex-col gap-10 md:hidden">
                {/* SOCIAL */}
                <div className="flex flex-col gap-3">
                    <p className="xs:text-xl">
                        {dictionary.titleSocial}
                    </p>
                    {/* ICONS */}
                    <div className="flex gap-2">
                        <FaInstagram size={30} />
                        <FaFacebook size={30} />
                    </div>

                </div>

                {/* POLICY BTN */}
                <div className="flex flex-col">
                    <p className={policyClass}>
                        {dictionary.cookie}
                    </p>
                    <Link href={`/${lang}/policy`} target="_blank" className={`${policyClass} hover:text-gold transition-all duration-300 block`}>
                        {dictionary.policy}
                    </Link>
                    <Link href={`/${lang}/termsofuse`} target="_blank" className={`${policyClass} hover:text-gold transition-all duration-300 block`}>
                        {dictionary.terms}
                    </Link>
                </div>

                {/* COPIRIGHT */}
                <div className={`flex flex-col ${textClass}`}>

                    <p className={copyright}>
                        <DataLive dictionary={dictionary} />
                    </p>

                    {/* <p className={copyright}>
                        Design & Coding: {dictionary.design}
                    </p> */}

                    <AgencyTag />
                </div>
            </div>

            {/* LAYOUT ONLY DESK */}

            <div className="hidden xl:flex flex-col w-fit ">
                <MasterTitle className="py-7  xl:text-9xl 2xl:text-[170px]" tag="div">
                    {dictionary.headline}
                </MasterTitle>


                <div className="flex md:mt-40 justify-between">

                    <div className="flex w-full justify-between gap-5">

                        {/* CONTACT COL-1 */}
                        <div className="flex flex-col gap-1 justify-between">

                            <div className="">
                                <p className={`w-2/3 ${textClass}`}>
                                    {dictionary.adress}
                                </p>
                            </div>

                            <div className="">
                                <p className={`${textClass}`}>
                                    {dictionary.pIva}
                                </p>
                                <p className={`${textClass}`}>
                                    {dictionary.CIN}
                                </p>
                            </div>
                        </div>

                        {/* SOCIAL COL-2 */}
                        <div className="flex flex-col gap-3 justify-between">
                            <div className="flex flex-col gap-3">
                                <p className="">
                                    {dictionary.titleSocial}
                                </p>
                                {/* ICONS */}
                                <div className="flex gap-2">
                                    <FaInstagram size={30} className={hoverIcon} />
                                    <FaFacebook size={30} className={hoverIcon} />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1 mt-7">
                                <Link href={`/${lang}/contact`} className={`${textClass} hover:text-gold transition-all duration-300 w-fit block`}>
                                    {dictionary.mail}
                                </Link>
                                <a href={`tel:${dictionary.cell}`} className={`${textClass} hover:text-gold transition-all duration-300 w-fit block`}>
                                    {dictionary.cell}
                                </a>
                                <a href={`tel:${dictionary.cellTwo}`} className={`${textClass} hover:text-gold transition-all duration-300 w-fit block`}>
                                    {dictionary.cellTwo}
                                </a>
                            </div>

                        </div>

                        {/* MENU COL-3 */}
                        <div className="flex items-end">
                            <Menu />
                        </div>

                        {/* INFO E DATA COL-4 */}
                        <div className="hidden md:flex flex-col gap-10">

                            <div className="hidden xl:block">
                                <BtnBase
                                    iconEnd={extra.maps}
                                    className="border-2 border-transparent hover:border-t-[#4285F4] hover:border-r-[#EA4335] hover:border-b-[#FBBC05] hover:border-l-[#34A853] transition-all duration-300"
                                    href={dictionary.assetUi.navigatorBeB.gMaps}
                                >

                                    {dictionary.assetUi.navigatorBeB.label}
                                </BtnBase>
                            </div>


                            {/* POLICY BTN */}
                            <div className="flex flex-col text-right xl:pe-3">
                                <p className={policyClass}>
                                    {dictionary.cookie}
                                </p>
                                <Link href={`/${lang}/policy`} target="_blank" className={`${policyClass} hover:text-gold transition-all duration-300 block`}>
                                    {dictionary.policy}
                                </Link>
                                <Link href={`/${lang}/termsofuse`} target="_blank" className={`${policyClass} hover:text-gold transition-all duration-300 block`}>
                                    {dictionary.terms}
                                </Link>
                            </div>


                        </div>

                    </div>


                </div>
                {/* COPIRIGHT  DESK*/}
                <div className={`xl:flex w-full justify-between hidden mt-13 ${textClass}`}>

                    <div className="flex flex-col gap-1">
                        <p className={`${textClass}`}>
                            {dictionary.regionalText}
                        </p>

                        <p className={copyright}>
                            <DataLive dictionary={dictionary} />
                        </p>
                    </div>


                    <div className="flex flex-col gap-1 text-right">
                        {/*  <p className={copyright}>
                            Design & Coding: {dictionary.design}
                        </p> */}

                        <AgencyTag />
                    </div>
                </div>
            </div>

            {isBookingOpen && bookingDictionary && (
                <div
                    className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm"
                    onClick={() => setIsBookingOpen(false)}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <BookingNav
                            dictionary={bookingDictionary}
                            lang={lang}
                            bookNavOpen={true}
                            setBookNavOpen={(val) => !val && setIsBookingOpen(false)}
                            expandBookNav={() => { }}
                            btnClassName="hidden"
                        />
                    </div>
                </div>
            )}

        </footer >
    )
}