
import { cn } from "@/lib/utility"

export default function BubbleFrame({ children, color, className, bubbleClass, divBubbleCls, tag: Tag = "div", ...props }) {
    return (
        <Tag className={cn("flex w-full h-svh lg:h-dvh justify-center items-center relative p-2 md:p-5", className, divBubbleCls)} {...props}>
            <div className={cn("flex w-screen h-full bg-amber-400/60 relative overflow-hidden rounded-3xl xl:rounded-[40px]", bubbleClass, color)}>
                {children}
            </div>
        </Tag>
    )
}