import { twMerge } from "tailwind-merge";

function Input({ isTextArea, className, ...props }) {
    const Component = isTextArea ? "textarea" : "input";
    return (
        <Component
            className={twMerge("bg-stone-600 p-2 rounded-lg", className)}
            {...props}
        />
    );
}
export default Input;