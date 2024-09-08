'use client';

import Titulo from "@/components/Titulo/Titulo";
import { useState, useEffect } from "react";
import { useTickets } from '@/hooks/useTickets';
import useTitle from "@/hooks/useTitle";
import { LineGraph } from "@/components/GraficoLineal/graficoLineal";
import BarGraph from "@/components/Bar/bar";
import { PieChart } from "@/components/graficoCircular/pieChart";
import styles from "./page.module.css";
import { PieDataChart } from "@/components/graficoCircular/pieDataChart";
import DoughnutChart from "@/components/Doughnut/doughnut";
import TicketDetails from "@/components/TicketDetails/ticketDetails";

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

    const labels = ["L", "M", "M", "J", "V", "S", "D"];
    const ticketsTotales = [300, 450, 400, 500, 600, 550, 700];
    const ticketsResueltos = [200, 350, 300, 400, 500, 450, 600];
    const tiempoResolucion = [10, 20, 15, 30, 25, 35, 40];
    const tiempoSinResolver = [5, 10, 8, 15, 12, 20, 25];

    return (
        <div className={styles.container}>
            <Titulo titulo={"Estadísticas"} />
            <div className={styles.lineChartsWrapper}>
                <LineGraph title="Tickets Totales" data={ticketsTotales} labels={labels} number="54" />
                <LineGraph title="Tickets Resueltos" data={ticketsResueltos} labels={labels} number="43" />
                <LineGraph title="Tiempo Resolución" data={tiempoResolucion} labels={labels} number="3 hs" />
                <LineGraph title="Tiempo Sin Resolver" data={tiempoSinResolver} labels={labels} number="11" />
            </div>
            <div className={styles.graphsRow}>
                <div className={styles.pieWrapper}>
                    <PieChart data={pieData} title="% Tickets resueltos"/>
                </div>
                <div className={styles.barWrapper}>
                    <BarGraph title="Tickets por prioridad" />
                </div>
                <div className={styles.doughnutChartContainer}>
                    <DoughnutChart title="% Tickets por estado" />
                </div>
                <div className={styles.ticketDetailsWrapper}>
                    <TicketDetails 
                        title="Detalles de Tickets"
                        totalTickets={200} 
                        highPriority={30} 
                        assignedTickets={150} 
                        unassignedTickets={50} 
                        overdueTickets={15} 
                        newTickets={40} 
                    />
                </div>
            </div>
        </div>
    );
}
