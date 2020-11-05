import React, { ReactNode } from 'react';

type ButtonProps = {
    bgColor: "gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "indigo" | "purple" | "pink" | "white" | "dark" | "transparent"
    bgColorIntensity?: "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
    bgColorHover?: "gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "indigo" | "purple" | "pink" | "white" | "dark" | "transparent",
    bgColorHoverIntensity?: "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
    bgColorFocus?: "gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "indigo" | "purple" | "pink" | "white" | "dark" | "transparent",
    bgColorFocusIntensity?: "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
    bgColorActive?: "gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "indigo" | "purple" | "pink" | "white" | "dark" | "transparent",
    bgColorActiveIntensity?: "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
    textColor?: "gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "indigo" | "purple" | "pink" | "white" | "dark" | "transparent",
    textColorIntensity?: "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
    textColorHover?: "gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "indigo" | "purple" | "pink" | "white" | "dark" | "transparent",
    textColorHoverIntensity?: "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
    textColorFocus?: "gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "indigo" | "purple" | "pink" | "white" | "dark" | "transparent",
    textColorFocusIntensity?: "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
    textColorActive?: "gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "indigo" | "purple" | "pink" | "white" | "dark" | "transparent",
    textColorActiveIntensity?: "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
    textSize?: "text-sm" | "text-md" | "text-xl",
    addStyle?: string,
    size?: 'sm' | 'full',
    type?: "button" | "submit" | "reset",
    disabled?: boolean,
    isLoading?: boolean,
    onClick?: Function,
    children: ReactNode,
}

const Button = ({
    bgColor,
    bgColorIntensity = "500",
    bgColorHover = bgColor,
    bgColorHoverIntensity = "400",
    bgColorFocus = bgColor,
    bgColorActive = bgColor,
    bgColorFocusIntensity = "600",
    bgColorActiveIntensity = "500",
    textColor = "indigo",
    textColorIntensity = "500",
    textColorHover = textColor,
    textColorHoverIntensity = "500",
    textColorFocus = textColor,
    textColorFocusIntensity = "500",
    textColorActive = textColor,
    textColorActiveIntensity = textColorIntensity,
    textSize = 'text-sm',
    addStyle,
    size = 'sm',
    type = 'button',
    disabled = false,
    isLoading = false,
    onClick,
    children, }: ButtonProps) => {

    const setStyle = (): string => {
        let basicStyle = 'inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md focus:outline-none transition ease-in-out duration-150 ';
        let sizeStyle = `${size === "sm" ? '' : "w-full"}`;
        let textStyle = `${!((textColor === "white") || (textColor === "dark") || (textColor === "transparent")) ? `text-${textColor}-${textColorIntensity}` : `text-${textColor}`}`;
        let hoverTextStyle = `${!((textColorHover === "white") || (textColorHover === "dark") || (textColorHover === "transparent")) ? `hover:text-${textColorHover}-${textColorHoverIntensity}` : `hover:text-${textColorHover}`}`;
        let bgColorStyle = `bg-${bgColor}-${bgColorIntensity}`;
        let hoverBgColorStyle = `hover:bg-${bgColorHover}-${bgColorHoverIntensity}`;
        let focusStyle = `focus:border-${bgColorFocus}-${bgColorFocusIntensity} focus:shadow-outline-${bgColorFocus}`;
        let focusTextStyle = `${!((textColorFocus === "white") || (textColorFocus === "dark") || (textColorFocus === "transparent")) ? `focus:text-${textColorFocus}-${textColorFocusIntensity}` : `focus:text-${textColorFocus}`}`;
        let activeStyle = `active:bg-${bgColorActive}-${bgColorActiveIntensity}`;
        let activeTextStyle = `${!((textColorActive === "white") || (textColorActive === "dark") || (textColorActive === "transparent")) ? `active:text-${textColorActive}-${textColorActiveIntensity}` : `active:text-${textColorActive}`}`;
        let loadingStyle = `${isLoading && `cursor-not-allowed bg-${bgColorHover}-${bgColorHoverIntensity}`}`;

        let styles = `${basicStyle} ${sizeStyle} ${textStyle} ${hoverTextStyle} ${bgColorStyle} ${hoverBgColorStyle} ${focusStyle} ${focusTextStyle} ${activeStyle} ${activeTextStyle} ${loadingStyle} ${textSize} ${addStyle}`;

        return styles;
    }

    return (
        <button type={type} className={setStyle()} onClick={() => onClick && onClick()} disabled={disabled}>
            {children}
            <span>
                <svg className={`animate-spin mr-3 h-5 w-5 text-white inline ml-2 ${isLoading ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4}></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </span>
        </button>
    )
}

export default Button;