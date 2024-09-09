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
    const { ticketsNoResueltos, porcResueltos, semana, resueltosSemana, promedioResolucion, ticketsPrioridad, porcentajeEstado } = useTickets({ id: 2 });
    const { setTitulo } = useTitle();
    const [pieData, setPieData] = useState(PieDataChart({ Realizados: 0, NoRealizados: 0 }));

    useEffect(() => {
        setTitulo("Estadísticas");

        if (porcResueltos) {
            setPieData(PieDataChart(porcResueltos));
        }
    }, [porcResueltos, setTitulo]);

    const labels = ["L", "M", "X", "J", "V", "S", "D"];
    const totalTicketsSemana = semana && typeof semana === 'object'
        ? Object.values(semana).reduce((acc, val) => acc + (val || 0), 0)
        : 0;
    const totalTickesResueltos = resueltosSemana && typeof resueltosSemana === 'object'
        ? Object.values(resueltosSemana).reduce((acc, val) => acc + (val || 0), 0)
        : 0;
        const totalTicketsNoResueltos = ticketsNoResueltos && typeof ticketsNoResueltos === 'object'
        ? Object.values(ticketsNoResueltos).reduce((acc, val) => acc + (val || 0), 0)
        : 0;

    const tiempoSinResolver = [5, 10, 8, 15, 12, 20, 25];
    return (
        <div className={styles.container}>
            <Titulo titulo={"Estadísticas"} />
            <div className={styles.lineChartsWrapper}>
                <LineGraph title="Tickets Totales" data={semana} labels={labels} number={totalTicketsSemana} />
                <LineGraph title="Tickets Resueltos" data={resueltosSemana} labels={labels} number={totalTickesResueltos} />
                <LineGraph title="Pensar otro graph" data={promedioResolucion} labels={labels} number="3 hs" />
                <LineGraph title="Tickets Sin Resolver" data={ticketsNoResueltos} labels={labels} number={totalTicketsNoResueltos} />
            </div>
            <div className={styles.graphsRow}>
                <div className={styles.pieWrapper}>
                    <PieChart data={pieData} title="% Tickets resueltos"/>
                </div>
                <div className={styles.barWrapper}>
                    <BarGraph title="Tickets por prioridad" data={ticketsPrioridad} />
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
