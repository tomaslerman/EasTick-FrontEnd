import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import styles from "./bar.module.css";
import { BarChartData } from "./barData";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarGraph = () => {
    const options = {
        responsive: true,
        maintainAspectRatio: true,
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
