'use client'
import Titulo from "@/components/Titulo/Titulo";
import { useEffect } from "react";
import useTitle from "@/hooks/useTitle";
import { LineGraph } from "@/components/GraficoLineal/graficoLineal";
import BarGraph from "@/components/Bar/bar";
import { Pie } from "react-chartjs-2";
import { PieDataChart } from "@/components/graficoCircular/pieDataChart";
import pieChartStyles from "@/components/graficoCircular/pieChart.module.css";
import styles from "./page.module.css";  // Importa el archivo CSS específico de esta página
import { options } from "@/components/graficoCircular/pieChart";

export default function estadistica() {
    const { setTitulo } = useTitle();

    useEffect(() => {
        setTitulo("Estadisticas");
    }, []);

    return (
        <div>
            <Titulo titulo={"Estadisticas"} />
            <div className={styles.lineChartsWrapper}>  {/* Contenedor para los gráficos lineales */}
                <LineGraph />
                <LineGraph />
                <LineGraph />
                <LineGraph />
            </div>
            <div className={pieChartStyles.graphsContainer}>
                <div className={pieChartStyles.pieChartContainer}>
                    <div className={pieChartStyles.pieContainer}>
                        <Pie options={options} data={PieDataChart} />
                    </div>
                </div>
                <div className={pieChartStyles.graph}>
                    <BarGraph />
                </div>
            </div>
        </div>
    );
}
