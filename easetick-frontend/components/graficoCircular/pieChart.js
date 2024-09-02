'use client';
import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJs, Tooltip, Legend, ArcElement } from "chart.js";
import styles from "./pieChart.module.css";

ChartJs.register(Tooltip, Legend, ArcElement);

export const PieChart = ({ data }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className={styles.pieChartContainer}>
            <Pie options={options} data={data} />
        </div>
    );
};
