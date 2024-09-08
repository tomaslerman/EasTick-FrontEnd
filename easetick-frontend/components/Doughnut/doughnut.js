'use client';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement, Title } from 'chart.js';
import styles from './doughnut.module.css';

ChartJS.register(Tooltip, Legend, ArcElement, Title);

const DoughnutChart = ({ title }) => {
    const data = {
        labels: ['Abierto', 'Cerrado', 'En progreso', 'En espera'],
        datasets: [
            {
                label: 'Tickets por estado',
                data: [50, 120, 75, 30], // Ejemplo de valores por estado
                backgroundColor: [
                    'rgba(75, 192, 192, 0.8)',  // Azul claro para "Abierto"
                    'rgba(54, 162, 235, 1)',    // Azul más oscuro para "Cerrado"
                    'rgba(153, 102, 255, 0.8)', // Violeta para "En progreso"
                    '#7efbbb',  // Amarillo para "En espera"
                ],
                borderWidth: 3, // Grosor del borde para resaltar más las secciones
                hoverOffset: 12, // Efecto de hover más grande para que destaque
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
                    padding: 20, // Espaciado entre leyenda y gráfico
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
                text: title,  // Título dinámico que llega por parámetro
                font: {
                    size: 18,
                    weight: 'bold',
                },
                padding: {
                    bottom: 10, // Más espacio debajo del título
                },
                color: "#333", // Color del título
            },
        },
        layout: {
            padding: 20, // Más espacio alrededor del gráfico
        },
    };

    return (
                <Doughnut data={data} options={options} />
    );
};

export default DoughnutChart;
