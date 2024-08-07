'use client';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJs, Tooltip, Legend, ArcElement } from "chart.js";
import { pieDataChart } from "./pieDataChart";
import styles from "./pieChart.module.css";

ChartJs.register(Tooltip, Legend, ArcElement);

export const PieChart = () => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className={styles.pieChartContainer}>
            <Pie options={options} data={pieDataChart} />
        </div>
    );
};