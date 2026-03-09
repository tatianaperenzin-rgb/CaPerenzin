"use client"

import { useState } from "react"
import { getDictionary } from "@/lib/dictionary"
import MasterTitle from "@/components/ui/typography/masterTitle"
import BtnBase from "@/components/ui/btnBase"
import SectionO from "@/components/home/sectionO"
import { Icon } from '@iconify/react'
import { BsPhoneFill } from "react-icons/bs"
import { RiSendPlaneFill } from "react-icons/ri"
import FormNew from "@/components/form/formNew"

export default async function ContattiPage({ dictionary, lang }) {


    const [isForm, setIsForm] = useState(null)
    const handleClick = () => (!isForm)

    const extra = {
        maps: (props) => <Icon icon="logos:google-maps" width="48.83" height="70" {...props} />,
        whatsApp: (props) => <Icon icon="ri:whatsapp-fill" width="70" height="70" style={{ color: '#08cb51' }} {...props} />,
        cell: BsPhoneFill,
        send: RiSendPlaneFill

    }



    return (
        <div className="flex flex-col w-full h-full xl:h-dvh">
            <div className="flex flex-col h-full lg:h-dvh w-full xl:flex-row xl:p-10">

                {/* BOX TEXT E DATA */}
                <div className="flex flex-col 
                            h-[89vh] md:h-fit 
                            w-full xl:w-1/2
                            gap-20 xs:gap-30 
                            p-7 md:p-10
                            mt-17 xs:mt-25 md:mt-0 md:py-35 lg:py-0 lg:mt-30 xl:mt-10 2xl:mt-15">

                    <div>
                        <MasterTitle>
                            <span
                                className="w-50 md:w-100 xl:w-100
                                        text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl block
                                        
                            "
                            >{dictionary.headline}</span>
                        </MasterTitle>

                        <p
                            className="font-bold text-xl md:text-3xl xl:text-2xl pt-3"
                        >{dictionary.subHeadline}</p>

                        <p
                            className="font-muller
                                    py-7
                                    xs:pe-20 md:pe-37 xl:pe-10 2xl:pe-30
                                    md:text-lg"
                        >{dictionary.content}</p>

                        <div className="flex flex-wrap gap-3
                                    xs:gap-4
                                    xs:mt-10
                                    pe-20">
                            {dictionary.buttons.map((item, i) => {

                                const icons = extra[item.id]

                                return (
                                    <div key={item.id} className="flex">
                                        <BtnBase
                                            iconStart={icons}
                                        >
                                            {item.label}
                                        </BtnBase>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col gap-7">
                        <h2 className="font-bold text-3xl xl:w-150">
                            {dictionary.ctaMail}
                        </h2>
                        <div>
                            <BtnBase
                                iconStart={extra.send}
                            >
                                {dictionary.mailBtn.label}
                            </BtnBase>
                        </div>

                    </div>



                </div>


                {/* BOX MAPS */}
                {!isForm ? (
                    <div className="flex w-full xl:w-1/2 h-full p-7 xl:p-0 relative lg:mt-30 xl:mt-7">
                        <iframe src="https://snazzymaps.com/embed/766389"
                            width="100%"
                            style={{ border: "none" }}
                            className="rounded-3xl xl:rounded-[40px] h-[600px] xl:h-full">
                        </iframe>

                        <div className="flex flex-col w-auto h-auto p-5 bg-background rounded-3xl xl:rounded-[30px] absolute bottom-9 right-9 xl:right-3 xl:bottom-3  gap-3">
                            <p className="text-right font-muller">{dictionary.infoBox.adress}</p>
                            <BtnBase
                                iconEnd={extra.maps}
                            >
                                {dictionary.infoBox.btn.label}
                            </BtnBase>
                        </div>
                    </div>
                ) : (
                    <FormNew onClose={handleClick} />
                )}

            </div>
            <SectionO dictionary={dictionaryFull.sectionO} lang={lang} />


        </div>
    )
}