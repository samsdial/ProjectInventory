import React from "react";
import { GraficsApp } from "../../components/GraficsApp";


const stockData = [
    { time: '2024-10-01', value: 80 },
    { time: '2024-10-02', value: 75 },
    { time: '2024-10-03', value: 85 },
    { time: '2024-10-04', value: 90 },
    { time: '2024-10-05', value: 78 },
    { time: '2024-10-06', value: 82 },
];

export const ReportsPage: React.FC = () => {
    return (
        <div className="fade-in mt-6">
            <div className="p-4 flex justify-center rounded-lg border border-gray-300 shadow-lg min-w-min">
                <GraficsApp data={stockData} nameGrafic="Movements october" />
            </div>
        </div>
    );
};
