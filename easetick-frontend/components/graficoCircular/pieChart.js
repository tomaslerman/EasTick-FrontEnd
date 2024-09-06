'use client';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJs, Tooltip, Legend, ArcElement, Title } from "chart.js";
import styles from "./pieChart.module.css";

ChartJs.register(Tooltip, Legend, ArcElement, Title);

export const PieChart = ({ data, title }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                position: 'bottom',
                labels: {
                    color: "#333",
                    font: {
                        size: 16,
                        weight: "bold",
                    },
                },
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
                text: title,  // Título dinámico que llega por parámetro
                font: {
                    size: 16,
                    weight: 'bold',
                },
                padding: {
                    bottom: 20,
                },
            },
        },
        layout: {
            padding: 20,
        },
    };

    return (
        <div className={styles.pieChartContainer}>
            <div className={styles.pieWrapper}>
                <Pie options={options} data={data} />
            </div>
        </div>
    );
};

export default PieChart;

export const PieDataChart = (data) => ({
    labels: ["Tickets resueltos", "Tickets no resueltos"],
    datasets: [
        {
            label: "Tickets",
            data: [data.Realizados || 0, data.NoRealizados || 0],
            backgroundColor: [
                "rgba(75, 192, 192, 0.8)",  // Azul claro
                "rgba(54, 162, 235, 1)",  // Rojo claro
            ],
            borderWidth: 2,
            hoverOffset: 8,
        },
    ],
});
