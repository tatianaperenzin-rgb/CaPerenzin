
import InfoPill from "../ui/infoPill"
import BtnBase from "../ui/btnBase"
import SmartBackground from "../image/smartBackround"
import BubbleFrame from "../ui/bubbleFrame"
import { BsArrowDownRightCircle } from "react-icons/bs"
import { BiWater } from "react-icons/bi"
import { BiWind } from "react-icons/bi"
import { GiFallingRocks } from "react-icons/gi"
import { TbMapSearch } from "react-icons/tb"
import { GiKey } from "react-icons/gi"
import { PiWine } from "react-icons/pi"
import { GiCheeseWedge } from "react-icons/gi"
import Link from "next/link"

export default function SectionM({ dictionary, lang }) {

    const iconSize = " w-[20px] h-[15px]"

    const dataCards = [
        {
            id: "cardOne",
            category: "sport",
            headline: dictionary.cardOne.headline,
            pills: [
                {
                    icons: <BiWater className={iconSize} />,
                    label: dictionary.cardOne.pill.fisrt
                },
                {
                    icons: <BiWind className={iconSize} />,
                    label: dictionary.cardOne.pill.second
                },
                {
                    icons: <GiFallingRocks className={iconSize} />,
                    label: dictionary.cardOne.pill.third
                }
            ],
            content: dictionary.cardOne.content,
            labelBtn: dictionary.cardOne.labelBtn,
            scrImg: dictionary.cardOne.scrImg,
            altImg: dictionary.cardOne.altImg
        },
        {
            id: "cardTwo",
            category: "culture",
            headline: dictionary.cardTwo.headline,
            pills: [
                {
                    icons: <TbMapSearch className={iconSize} />,
                    label: dictionary.cardTwo.pill.fisrt
                },
                {
                    icons: <GiKey className={iconSize} />,
                    label: dictionary.cardTwo.pill.second
                }
            ],
            content: dictionary.cardTwo.content,
            labelBtn: dictionary.cardTwo.labelBtn,
            scrImg: dictionary.cardTwo.scrImg,
            altImg: dictionary.cardTwo.altImg
        },
        {
            id: "cardThree",
            category: "food",
            headline: dictionary.cardThree.headline,
            pills: [
                {
                    icons: <PiWine className={iconSize} />,
                    label: dictionary.cardThree.pill.fisrt
                },
                {
                    icons: <GiCheeseWedge className={iconSize} />,
                    label: dictionary.cardThree.pill.second
                }
            ],
            content: dictionary.cardThree.content,
            labelBtn: dictionary.cardThree.labelBtn,
            scrImg: dictionary.cardThree.scrImg,
            altImg: dictionary.cardThree.altImg
        }
    ]

    return (
        <section className="flex w-full h-[110vh] lg:h-dvh items-center justify-center
                        gap-10 px-1 md:px-7 2xl:px-25
                        ">

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-3 xl:gap-7 lg:overflow-auto">
                {dataCards.map((card) => (
                    <div key={card.id} className="flex flex-col
                                                rounded-4xl xl:rounded-[40px]
                                                w-full h-60 xs:h-70 md:h-80
                                                  lg:h-130 
                                                relative
                                                overflow-hidden justify-end
                                                p-5
                                                ">

                        <SmartBackground
                            srcDesktop={card.scrImg}
                            srcMobile=""
                            alt={card.altImg}
                        />
                        {/* BG_OVERLAY_GOLD-GRADIENT */}
                        <div className="absolute inset-0 z-1 bg-gradient-to-t from-gold from-0% via-gold via-45% to-transparent to-90% " />

                        {/* BG_OVERLAY_PHONE_BLACK */}
                        <div className="absolute inset-0  bg-black/50 lg:hidden" />

                        {/* HEADLINE ONLY DESK*/}
                        <h2 className=" hidden lg:block font-black z-10 text-balance
                                            md:text-3xl
                                            xl:mb-3">
                            {card.headline}
                        </h2>

                        {/* INFO BLOCK */}
                        <div className="z-20">
                            {/* HEADLINE ONLY TABLET */}
                            <h2 className=" hidden md:block lg:hidden font-black text-lg
                                            md:text-3xl">
                                {card.headline}
                            </h2>

                            {/* PILL INFO BOX  */}
                            <div className="flex flex-wrap py-3 gap-1.5">
                                {card.pills.map((pill, index) => (
                                    <InfoPill key={index}
                                        className="bg-foreground/80 font-muller font-bold
                                                    py-1.5 xs:py-2 md:py-1.5
                                                    px-2 xs:px-3  
                                                    gap-1 "
                                    >
                                        {pill.icons}
                                        {pill.label}
                                    </InfoPill>
                                ))}
                            </div>

                            {/* HEADLINE ONLY PHONE */}
                            <h2 className=" font-black text-lg md:hidden ">
                                {card.headline}
                            </h2>

                            <p className="font-muller text-sm xs:text-base lg:text-sm xl:text-base
                                        py-3 text-balance
                                        ">
                                {card.content}
                            </p>

                            <Link href={`/${lang}/experiences?category=${card.category}`} passHref>
                                <BtnBase
                                    as="div"
                                    className="mt-2 xs:mt-3 md:mt-9 bg-background/90 shadow-xl"
                                    iconEnd={BsArrowDownRightCircle}
                                    iconClassName="rotate-270 scale-80 xs:scale-100 text-foregraund opacity-80"
                                    textClassName="text-foreground group-hover:text-gold transition-all duration-300"
                                >
                                    {card.labelBtn}
                                </BtnBase>
                            </Link>

                        </div>

                    </div>
                ))}
            </div>

        </section>
    )
}