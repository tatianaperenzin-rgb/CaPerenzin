import { cn } from "@/lib/utility"
import TextareaAutosize from 'react-textarea-autosize'

export const FormWrapper = ({ id, children, onSubmit, wrapperClassName }) => (
    <form id={id} onSubmit={onSubmit} className={cn(`flex flex-col w-full  items-center justify-center gap-3`, wrapperClassName)}>
        {children}
    </form>
)

export const InputField = ({ label, type = "text", placeholder, name, inputClassName, labelClassName, ...props }) => (
    <div className="flex flex-col w-full">
        <label className={cn(`text-sm xs:text-base text-white`, labelClassName)}>
            {label}
        </label>
        <input
            name={name || "non collegato"}
            type={type || "non collegato"}
            placeholder={placeholder || "non collegato"}
            className={cn(`
                text-gold
                flex w-full border-b-2  border-gold outline-none transition-all duration-300
                focus:border-gold 
                placeholder:text-gold/50 placeholder:text-xs placeholder:pb-3
        `, inputClassName)}
            {...props}
        />
    </div>
)

export const TextAreaFieldAuto = ({
    label,
    placeholder,
    name,
    rows = 1, // <--- Impostalo a 1 se vuoi che parta piccolo
    textareaClassName,
    labelClassName,
    ...props
}) => (
    <div className="flex flex-col w-full">
        <label className={cn(`text-sm xs:text-base text-white`, labelClassName)}>
            {label}
        </label>

        <TextareaAutosize
            name={name}
            minRows={rows} // <--- Usa minRows invece di rows fisso
            placeholder={placeholder || "non collegato"}
            className={cn(`
                text-gold
                flex w-full border-b-2 border-gold bg-transparent outline-none transition-all duration-300
                focus:border-gold
                placeholder:text-gold/50 placeholder:text-xs placeholder:pb-1
                resize-none overflow-hidden  
            `, textareaClassName)}
            {...props}
        />
    </div>
)



