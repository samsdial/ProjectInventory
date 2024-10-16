import React, { useState, useEffect } from "react";

import Datepicker from "react-tailwindcss-datepicker";
import Select from "react-tailwindcss-select";
import { ResponsiveLine } from "@nivo/line";

import { getProducts } from "../../api/products/getProducts";
import { getTransactionHistory } from "../../api/charts/getCharts";

interface Option {
  value: string;
  label: string;
}

export const MovementHistoryPage: React.FC = () => {
  const [rangeDates, setRangeDates] = useState({
    startDate: null,
    endDate: null,
  });
  const [options, setOptions] = useState<Option[]>([]);
  const [optionSelected, setOptionSelected] = useState<Option | null>(null);

  const [historyProducts, setHistoryProducts] = useState([
    {
      id: " ",
      color: "hsl(272, 61%, 34%);",
      data: [
        {
          x: "1990-01-01",
          y: 0,
        },
      ],
    },
  ]);

  const [hideChart, setHideChart] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        const data = response.data;

        if (data) {
          const opt = data.map((element: any) => ({
            value: element._id,
            label: element.name,
          }));
          setOptions(opt);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (
      optionSelected &&
      rangeDates.startDate !== null &&
      rangeDates.endDate !== null
    ) {
      function organizeData(response: any) {
        response.data.sort(
          (a: any, b: any): any =>
            new Date(b.create_at).getTime() - new Date(a.create_at).getTime()
        );

        if (!response.error) {
          const { product_id } = response.data[0];
          const { name } = product_id;

          const s = response.data.map((element: any) => {
            const date = new Date(element.create_at);
            const formattedDate = date.toISOString().slice(0, 10);

            return { x: formattedDate, y: element.quantity_moved };
          });
          return [{ id: name, color: "hsl(272, 61%, 34%);", data: s }];
        }
        return [];
      }

      const fetchHistoryProducts = async () => {
        try {
          const { startDate, endDate } = rangeDates;
          if (startDate && endDate && optionSelected) {
            const { value } = optionSelected;
            const response = await getTransactionHistory(
              startDate,
              endDate,
              value
            );
            setHideChart(true);

            if (response.data) {
              const result = organizeData(response);
              if(result){
                setHideChart(false);
              }

              setHistoryProducts(result);
            }
          }
        } catch (error) {
          console.error("Failed to fetch History products:", error);
        }
      };

      fetchHistoryProducts();
    }
  }, [optionSelected, rangeDates]);

  const handleChange = (value: any): void => {
    setOptionSelected(value);
  };

  return (
    <div className="fade-in mt-6">
      <div className="flex w-full space-x-4 pb-5">
        <div className="w-1/2">
          <Datepicker
            primaryColor={"violet"}
            value={rangeDates}
            onChange={(newValue: any) => setRangeDates(newValue)}
            showShortcuts={true}
          />
        </div>
        <div className="w-1/2">
          <Select
            value={optionSelected}
            onChange={handleChange}
            options={options}
            primaryColor=""
          />
        </div>
      </div>

      <div className="p-4 flex justify-center rounded-lg border border-gray-300 shadow-lg min-w-min">
        <div style={{ height: "400px", width: "100%" }}>
          {hideChart && <p>No data to show</p>}
          {!hideChart && (
            <ResponsiveLine
              data={historyProducts}
              axisBottom={{
                format: "%b %d",
                legend: "time scale",
                legendOffset: -12,
                tickValues: "every 30 days",
              }}
              axisLeft={{
                legend: "quantity scale",
                legendOffset: 12,
              }}
              curve="monotoneX"
              enablePointLabel
              enableTouchCrosshair
              margin={{
                bottom: 60,
                left: 80,
                right: 20,
                top: 20,
              }}
              colors={{ scheme: "purple_orange" }}
              pointBorderColor={{
                from: "color",
                modifiers: [["darker", 0.3]],
              }}
              pointBorderWidth={1}
              pointSize={16}
              useMesh
              xFormat="time:%Y-%m-%d"
              xScale={{
                format: "%Y-%m-%d",
                precision: "day",
                type: "time",
                useUTC: false,
              }}
              yScale={{
                type: "linear",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
