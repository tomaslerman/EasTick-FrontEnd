'use client';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJs, Tooltip, Legend, ArcElement } from "chart.js";
import { pieDataChart } from "./pieDataChart";
ChartJs.register(Tooltip, Legend, ArcElement);

export const pieChart = () => {
    const options = {
        responsive: true,
        
    };
    return(
        <>  
        <div> 
        <Pie options={options} data={pieDataChart}> </Pie>
        </div>
        </> 
    )
}