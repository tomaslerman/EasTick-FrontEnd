'use client';

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import styles from "./bar.module.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarGraph = ({ title }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Oculta la leyenda
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 12 },
                padding: 10,
                displayColors: false,
                cornerRadius: 4,
            },
            title: {
                display: true,
                text: title,
                color: 333,
                font: {
                    size: 16,
                    weight: 'bold',
                },
                padding: {
                    bottom: 10,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,  // Oculta las líneas de cuadrícula verticales
                },
                ticks: {
                    color: "#555",
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                grid: {
                    color: "rgba(200, 200, 200, 0.3)",  // Líneas de cuadrícula más suaves
                },
                ticks: {
                    display: false, // Oculta los números en el eje y
                    color: "#555",
                    font: {
                        size: 12,
                    },
                },
            },
        },
    };

    const BarChartData = {
        labels: ["Baja", "Media", "Alta", "Urgente"],
        datasets: [
            {
                data: [3000, 5000, 4500, 6000], // Datos correspondientes a las categorías
                backgroundColor: "rgba(54, 162, 235, 1)", // Color uniforme para un look moderno
                borderWidth: 2,
                hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
                borderRadius: 10,
            }
        ]
    };

    return (
        <div className={styles.barChartContainer}>
            <div className={styles.chartWrapper}>
                <Bar options={options} data={BarChartData} />
            </div>
        </div>
    );
};

export default BarGraph;
