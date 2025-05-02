
import React from "react";
import PropTypes from "prop-types";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    fullWidth = false,
    disabled = false,
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 
                ${bgColor} ${textColor} ${className} 
                ${fullWidth ? "w-full" : "w-auto"} 
                ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-opacity-80 active:scale-95"}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}

// Define PropTypes
Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    className: PropTypes.string,
    fullWidth: PropTypes.bool, // New prop to enable full-width button
    disabled: PropTypes.bool, // New prop to handle disabled state
};

