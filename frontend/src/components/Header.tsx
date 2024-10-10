import React from "react";
import { ButtonApp } from "./ButtonApp";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router";
import { logout } from "../store/slice/sliceAuthReducer";

export const Header: React.FC = () => {
    const dispatch: Dispatch = useDispatch();
    const navigate: NavigateFunction = useNavigate();

    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(logout());
        navigate("/login");
    }

    return (
        <header className="flex items-center justify-between bg-white px-6 py-4 border-b border-gray-300">
            <div className="text-xl font-semibold text-gray-800">Dashboard</div>
            <div className="flex items-center space-x-4">
                <button
                    className="text-gray-600 hover:text-gray-900 lg:hidden"

                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <ButtonApp color="bg-red-500" text="Logout" onClick={handleLogout} />
            </div>
        </header>
    );
};
