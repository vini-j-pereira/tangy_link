import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

export function Input(props: InputProps) {
    return (

        <input
            {...props}
            className="border-0 outline-none h-9 rounded-md px-2 bg-white mb-3 text-[#7ed957]"
        />

    )
}