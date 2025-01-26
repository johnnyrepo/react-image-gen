import { twMerge } from "tailwind-merge";

function Label({ htmlFor, className, children }) {
    return (
        <label htmlFor={htmlFor}
            className={twMerge("text-stone-50 font-bold mb-1 text-left text-xs upprcase", className)}>
            {children}
        </label>
    )
}

export default Label;