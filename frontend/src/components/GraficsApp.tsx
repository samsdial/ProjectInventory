import { createChart } from "lightweight-charts";
import React, { useEffect, useRef } from "react";

export const GraficsApp: React.FC<{ data: any, nameGrafic: string }> = ({ data, nameGrafic }) => {
    const chartContainerRef = useRef(null);

    useEffect(() => {
        // Crear el gráfico dentro del contenedor
        const chart = createChart(chartContainerRef.current!, {
            width: 800,
            height: 400,
            layout: {
                background: {
                    color: '#f5f5f5', // Ajusta el color de fondo de manera correcta
                },
                textColor: '#333', // Color de texto para mejorar la legibilidad
            },
            grid: {
                vertLines: {
                    color: '#d3d3d3', // Color gris suave para las líneas verticales
                    style: 1, // Línea sólida
                },
                horzLines: {
                    color: '#e0e0e0', // Mantiene las líneas horizontales en gris claro
                    style: 0, // Línea sólida
                },
            },
            crosshair: {
                mode: 0,
                vertLine: {
                    color: '#6c6c6c',
                    width: 1,
                    style: 1, // Línea sólida
                },
                horzLine: {
                    color: '#6c6c6c',
                    width: 1,
                    style: 1, // Línea sólida
                },
            },
            overlayPriceScales: {
                borderColor: '#cccccc', // Color de borde para la escala de precios
            },
            timeScale: {
                borderColor: '#cccccc', // Color de borde para la escala de tiempo
            },
        });

        const lineSeries = chart.addLineSeries({
            color: '#2962FF', // Un azul atractivo para la línea del gráfico
            lineWidth: 2, // Grosor de la línea
            crosshairMarkerVisible: true, // Mostrar marcador al interactuar
            crosshairMarkerRadius: 4,
            crosshairMarkerBackgroundColor: '#FF4081', // Color de marcador interactivo
        });

        // Cargar los datos en el gráfico
        lineSeries.setData(data);

        return () => chart.remove();
    }, [data]);
    return (
        <div>
            <h2>{nameGrafic}</h2>
            <div ref={chartContainerRef} />
        </div>
    );
};
