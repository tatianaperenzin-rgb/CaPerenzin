

import RoomCarosel from "@/components/ui/roomCarousel/roomCarosel"
import BtnBase from "../ui/btnBase"
import { cn } from "@/lib/utility"

export default function SectionC({ dictionary, lang, className }) {

    /*  const roomImage = [
 
 
         {
             id: 2,
             bkMobile: "https://res.cloudinary.com/dp1xgwqau/image/upload/v1766682668/image_17_fi8rmn.jpg",
             bkDesk: "https://res.cloudinary.com/dp1xgwqau/image/upload/v1766682668/image_17_fi8rmn.jpg",
             title: "Luxury Room",
             alt: "Vista mare"
         },
         {
             id: 3,
             bkMobile: "https://res.cloudinary.com/dp1xgwqau/image/upload/v1766682668/image_18_gmjqdq.jpg",
             bkDesk: "https://res.cloudinary.com/dp1xgwqau/image/upload/v1766682668/image_18_gmjqdq.jpg",
             title: "Luxury Room",
             alt: "Vista mare"
         },
         {
             id: 4,
             bkMobile: "https://res.cloudinary.com/dp1xgwqau/image/upload/v1766682668/image_16_vfwfzv.jpg",
             bkDesk: "https://res.cloudinary.com/dp1xgwqau/image/upload/v1766682668/image_16_vfwfzv.jpg",
             title: "Luxury Room",
             alt: "Vista mare"
         }
     ]
  */

    return (
        <section className={cn(`flex flex-col w-full h-full  pb-5 lg:pb-0 gap-2 
                         `, className)}>
            <RoomCarosel
                roomImage={roomImage}
                dictyonary={dictionary}
                lang={lang} />
            <BtnBase className="lg:hidden">
                hello
            </BtnBase>
        </section>
    )
}