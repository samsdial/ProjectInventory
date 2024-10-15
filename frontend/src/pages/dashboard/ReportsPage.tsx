import React from "react";
import { ResponsivePie } from "@nivo/pie";

const data = [
    {
        id: "erlang",
        label: "erlang",
        value: 218,
        color: "hsl(322, 70%, 50%)",
    },
    {
        id: "javascript",
        label: "javascript",
        value: 560,
        color: "hsl(205, 70%, 50%)",
    },
    {
        id: "python",
        label: "python",
        value: 208,
        color: "hsl(336, 70%, 50%)",
    },
    {
        id: "java",
        label: "java",
        value: 296,
        color: "hsl(53, 70%, 50%)",
    },
    {
        id: "scala",
        label: "scala",
        value: 408,
        color: "hsl(288, 70%, 50%)",
    },
];

export const ReportsPage: React.FC = () => {
    return (
        <div className="fade-in mt-6">
            <div className="p-4 flex justify-center rounded-lg border border-gray-300 shadow-lg min-w-min">
                <div style={{ height: '400px', width: '400px' }}> {/* Establece el tamaño del gráfico */}
                    <ResponsivePie
                        data={data}
                        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        activeOuterRadiusOffset={8}
                        borderWidth={1}
                        borderColor={{
                            from: 'color',
                            modifiers: [['darker', 0.2]],
                        }}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor="#333333"
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsColor={{ from: 'color' }}
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor={{
                            from: 'color',
                            modifiers: [['darker', 2]],
                        }}
                        legends={[
                            {
                                anchor: 'bottom',
                                direction: 'row',
                                justify: false,
                                translateX: 0,
                                translateY: 56,
                                itemsSpacing: 0,
                                itemWidth: 100,
                                itemHeight: 18,
                                itemTextColor: '#999',
                                itemDirection: 'left-to-right',
                                itemOpacity: 1,
                                symbolSize: 18,
                                symbolShape: 'circle',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000',
                                        },
                                    },
                                ],
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};
