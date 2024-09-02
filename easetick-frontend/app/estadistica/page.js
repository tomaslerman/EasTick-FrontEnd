'use client'
import Titulo from "@/components/Titulo/Titulo";
import { useState, useEffect } from "react";
import { useTickets } from '@/hooks/useTickets';
import useTitle from "@/hooks/useTitle";
import { LineGraph } from "@/components/GraficoLineal/graficoLineal";
import BarGraph from "@/components/Bar/bar";
import { PieChart } from "@/components/graficoCircular/pieChart";
import pieChartStyles from "@/components/graficoCircular/pieChart.module.css";
import styles from "./page.module.css";
import { PieDataChart } from "@/components/graficoCircular/pieDataChart";  // Importa la función

export default function Estadistica() {
    const { porcResueltos } = useTickets({ id: 2 });
    const { setTitulo } = useTitle();
    const [pieData, setPieData] = useState(PieDataChart({ Realizados: 0, NoRealizados: 0 }));

    useEffect(() => {
        setTitulo("Estadísticas");

        if (porcResueltos) {
            setPieData(PieDataChart(porcResueltos));
        }
    }, [porcResueltos, setTitulo]);

    return (
        <div>
            <Titulo titulo={"Estadísticas"} />
            <div className={styles.lineChartsWrapper}>
                <LineGraph />
                <LineGraph />
                <LineGraph />
                <LineGraph />
            </div>
            <div className={pieChartStyles.graphsContainer}>
                <div >
                    <PieChart data={pieData} />
                </div>
                <div className={pieChartStyles.graph}>
                    <BarGraph />
                </div>
            </div>
        </div>
    );
}
