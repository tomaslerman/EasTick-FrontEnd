'use client';

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js";
import styles from "./graficoLineal.module.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export const LineGraph = ({ title, data, labels, number }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // No mostrar la leyenda
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        return context.raw; // Muestra solo el valor numérico
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#555", // Color de las etiquetas del eje x
                    font: {
                        size: 12,
                    },
                },
                grid: {
                    display: false, // Quita las líneas de cuadrícula verticales
                },
            },
            y: {
                ticks: {
                    display: false, // Oculta los números en el eje y
                },
                grid: {
                    color: "rgba(200, 200, 200, 0.3)", // Líneas de cuadrícula más suaves
                },
            },
        },
    };

    return (
        <div className={styles.lineChartContainer}>
            <div className={styles.chartTitle}>{title}</div>
            <div className={styles.chartNumber}>{number}</div>
            <div className={styles.chartWrapper}>
                <Line options={options} data={{
                    labels,
                    datasets: [{
                        data,
                        fill: true,
                        backgroundColor: "rgba(54, 162, 235, 0.2)", // Color del relleno azul
                        borderColor: "rgba(54, 162, 235, 1)", // Color de la línea azul
                        tension: 0.4,
                        pointBackgroundColor: "#fff",
                        pointBorderColor: "rgba(54, 162, 235, 1)", // Color de borde de los puntos azul
                        pointRadius: 5,
                    }],
                }} />
            </div>
        </div>
    );
};
