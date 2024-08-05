import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import styles from "./graficoLineal.module.css";
import { lineChartData } from "./lineDataChart";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const LineGraph = () => {
    const options = {
        responsive: true,
        maintainAspectRatio: true,
    };

    return (
        <div className={styles.lineChartContainer}>
            <div className={styles.chartWrapper}>
                <Line options={options} data={lineChartData} />
            </div>
            <div className={styles.chartWrapper}>
                <Line options={options} data={lineChartData} />
            </div>
            <div className={styles.chartWrapper}>
                <Line options={options} data={lineChartData} />
            </div>
            <div className={styles.chartWrapper}>
                <Line options={options} data={lineChartData} />
            </div>
        </div>
    );
};
