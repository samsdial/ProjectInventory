import React, { useState } from "react";
import { Link } from "react-router-dom";

export const SideBar: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);//Aun esta pendeinte la version responsiva!!!!!!!!!!!!!!!!!

    return (
        <div className="">
            <div
                className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 transition-transform duration-300 ease-in-out z-10`}
            >
                <div className="flex gap-3 p-5 text-center text-2xl font-semibold border-b border-gray-700">
                    <img src="" alt="logo" />
                    <span>Inventory</span>
                </div>
                <nav className="mt-5">
                    <div className="px-3">
                        <Link
                            to="/home"
                            className="block rounded-lg px-4 py-2 mt-2 text-sm text-gray-200 hover:bg-gray-700"
                        >
                            Home
                        </Link>
                        <Link
                            to="/home/products"
                            className="block rounded-lg px-4 py-2 mt-2 text-sm text-gray-200 hover:bg-gray-700"
                        >
                            Products
                        </Link>
                        <Link
                            to="/home/reports"
                            className="block rounded-lg px-4 py-2 mt-2 text-sm text-gray-200 hover:bg-gray-700"
                        >
                            Reports
                        </Link>
                        <Link
                            to="/home/history"
                            className="block rounded-lg px-4 py-2 mt-2 text-sm text-gray-200 hover:bg-gray-700"
                        >
                            History of movements
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    );
};
