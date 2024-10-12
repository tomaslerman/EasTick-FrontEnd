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
import { ProtectedRoutes } from "../utils/ProtectedRoutes";

export default function Estadistica() {
    const { porcResueltos, semana, resueltosSemana, ticketsPrioridad, porcentajeEstado, cantidadTipo, calificacionesUsuario } = useTickets({ id: 2 });
    const { setTitulo } = useTitle();
    const [pieData, setPieData] = useState(PieDataChart({ Realizados: 0, NoRealizados: 0 }));

    useEffect(() => {
        setTitulo("Estadísticas");

        if (porcResueltos) {
            setPieData(PieDataChart(porcResueltos));
        }
    }, [porcResueltos, setTitulo]);

    const labels = ["D", "L", "M", "X", "J", "V", "S"];
    const labelsTipo = ["Pregunta", "Incidente", "Sugerencia", "Mantenimiento", "Reclamo"]

    const totalTicketsSemana = semana && typeof semana === 'object'
        ? Object.values(semana).reduce((acc, val) => acc + (val || 0), 0)
        : 0;
    const totalTickesResueltos = resueltosSemana && typeof resueltosSemana === 'object'
        ? Object.values(resueltosSemana).reduce((acc, val) => acc + (val || 0), 0)
        : 0;
    const totalCantidadTipo = cantidadTipo && typeof cantidadTipo === 'object'
        ? Object.values(cantidadTipo).reduce((acc, val) => acc + (val || 0), 0)
        : 0;
    const totalCalificaciones = calificacionesUsuario && typeof calificacionesUsuario === 'object'
        ? Object.values(calificacionesUsuario).reduce((acc, val) => acc + (val || 0), 0)
        : 0;
        
    return (
        <ProtectedRoutes>
        <div className={styles.container}>
            <Titulo titulo={"Estadísticas"} />
            <div className={styles.lineChartsWrapper}>
                <LineGraph title="Tickets Totales" data={semana} labels={labels} number={totalTicketsSemana} />
                <LineGraph title="Tickets Resueltos" data={resueltosSemana} labels={labels} number={totalTickesResueltos} />
                <LineGraph title="Tickets por Tipo" data={cantidadTipo} labels={labelsTipo} number={totalCantidadTipo} />
                <LineGraph title="Calificaciones por Usuario" data={calificacionesUsuario}  number={totalCalificaciones} />
            </div>
            <div className={styles.graphsRow}>
                <div className={styles.pieWrapper}>
                    <PieChart data={pieData} title="% Tickets resueltos"/>
                </div>
                <div className={styles.barWrapper}>
                    <BarGraph title="Tickets por prioridad" data={ticketsPrioridad} />
                </div>
                <div className={styles.doughnutChartContainer}>
                    <DoughnutChart title="% Tickets por estado" ticketsData={porcentajeEstado}/>
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
        </ProtectedRoutes>
    );
}
