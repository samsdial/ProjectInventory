import React from "react";
import { IInput } from "../interfaces";

export const Input: React.FC<IInput> = ({ type, placeholder }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className="rounded-lg py-2 px-2 text-gray-500 border border-gray-400 focus:outline-none focus:border focus:border-blue-300"
        />
    );
};