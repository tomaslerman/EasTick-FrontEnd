'use client';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement, Title } from 'chart.js';
import styles from './doughnut.module.css';

ChartJS.register(Tooltip, Legend, ArcElement, Title);

const DoughnutChart = ({ title, ticketsData = { abiertos: 0, cerrados: 0, esperandoRespuesta: 0 } }) => {
    // Asegúrate de que ticketsData siempre tiene valores por defecto
    const data = {
        labels: ['Abiertos', 'Cerrados', 'En espera'],
        datasets: [
            {
                label: 'Tickets por estado',
                data: [
                    ticketsData.abiertos || 0,           // Valor del estado "Abiertos"
                    ticketsData.cerrados || 0,           // Valor del estado "Cerrados"
                    ticketsData.esperandoRespuesta || 0, // Valor del estado "En espera"
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.8)',  // Azul claro para "Abiertos"
                    'rgba(54, 162, 235, 1)',    // Azul más oscuro para "Cerrados"
                    'rgba(255, 205, 86, 0.8)',  // Amarillo para "En espera"
                ],
                borderWidth: 3,
                hoverOffset: 12,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                position: 'top',
                labels: {
                    color: "#333",
                    font: {
                        size: 16,
                        weight: "bold",
                    },
                    padding: 20,
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 12 },
                padding: 10,
                displayColors: false,
                cornerRadius: 6,
            },
            title: {
                display: true,
                text: title,
                font: {
                    size: 18,
                    weight: 'bold',
                },
                padding: {
                    bottom: 10,
                },
                color: "#333",
            },
        },
        layout: {
            padding: 20,
        },
    };

    return (
        <Doughnut data={data} options={options} />
    );
};

export default DoughnutChart;
