import React, { useEffect, useState } from "react";

import { ResponsivePie } from "@nivo/pie";

import { getTopMovements } from "../../api/charts/getCharts";

export const TopProductsPage: React.FC = () => {
    const [topProducts, setTopProducts] = useState([]);
    function organizeData(response : any){
        if(!response.error){
            const totalSum = response.data.reduce((sum: number, element: any) => sum + element.total_moved, 0);
            return response.data.map((element:any)=> {
                const { product_name, total_moved } = element;
                const percentage = ((total_moved / totalSum) * 100).toFixed(2);
                return     {
                    id: product_name,
                    label: `${product_name} (${percentage}%)`,
                    value: total_moved,
                    percentage: `${percentage}%`
                }
            })
        }
        return [];
    }

    useEffect(() => {
        const fetchTopProducts= async () => {
          try {
            const response = await getTopMovements();    
            if (response) {
                const result = organizeData(response);
                setTopProducts(result);
            }
          } catch (error) {
            console.error("Failed to fetch Top products:", error);
          }
        };
    
        fetchTopProducts();
      }, []);


    return (
        <div className="fade-in mt-6">
            <div className="p-4 flex justify-center rounded-lg border border-gray-300 shadow-lg min-w-min">
                <div style={{ height: '400px', width: '100%' }}>
                    <ResponsivePie
                        data={topProducts}
                        sortByValue={true}
                        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        activeOuterRadiusOffset={8}
                        colors={{ scheme: 'purple_orange' }}
                        borderWidth={1}
                        borderColor={{
                            from: 'color',
                            modifiers: [['darker', 0.2]],
                        }}
                        arcLinkLabel={e=>e.id+" ("+e.value+")"}

                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor={{ from: 'color', modifiers: [] }}
                        arcLinkLabelsThickness={0}
                        arcLinkLabelsColor={{ from: 'color' }}
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor={"#ffffff"}
                        legends={[
                            {
                                anchor: 'bottom-left',
                                direction: 'column',
                                justify: false,
                                translateX: -61,
                                translateY: 0,
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
