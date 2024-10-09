import React from "react";
import { IButton } from "../interfaces";

export const Button: React.FC<IButton> = ({ text, color, onClick }) => {
    return (
        <button
            className={`${color} text-white px-4 py-2 rounded-lg hover:scale-105 transition duration-300 ease-in-out `}
            onClick={onClick}
        >
            {text}
        </button>
    );
};