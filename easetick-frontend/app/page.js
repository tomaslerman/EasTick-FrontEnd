'use client'
import styles from "./page.module.css";
import BoxDatoUnico from "@/components/BoxDatoUnico/boxDatoUnico";
import TicketSinResolver from "@/components/TicketSinResolver/ticketSinResolver";
import Feedback from "@/components/Feedback/feedback";
import { useTickets } from '@/hooks/useTickets';
import { useEffect } from "react";
import useTitle from "@/hooks/useTitle";
import { Pie } from "react-chartjs-2";
import { options } from "@/components/graficoCircular/pieChart";
import { PieDataChart } from "@/components/graficoCircular/pieDataChart";

export default function Home() {
    const { ticketsAsignados, ticketsSinResolver, ticketsResueltos, ticketsVencenHoy } = useTickets({ id: 2 });
    const { setTitulo } = useTitle();

    useEffect(() => {
        setTitulo("Home");
    }, [setTitulo]);

    return (
        <div className={styles.content}>
            <div className={styles.dashboard}>
                <BoxDatoUnico texto={"Tickets asignados"} dato={ticketsAsignados.length} />
                <BoxDatoUnico texto={"Tickets sin resolver"} dato={ticketsSinResolver.length} />
                <BoxDatoUnico texto={"Tickets resueltos"} dato={ticketsResueltos.length} />
                <BoxDatoUnico texto={"Vence hoy"} dato={ticketsVencenHoy.length} />
            </div>
            <div className={styles.mainContent}>
                <div className={styles.leftContent}>
                    <TicketSinResolver props={ticketsSinResolver} />
                </div>
                <div className={styles.rightContent}>
                <div className={styles.pieContainer}>
                        <Pie options={options} data={PieDataChart} />
                    </div>
                    <Feedback total={10} positivo={50} neutral={20} negativo={30} />
                </div>
            </div>
        </div>
    );
}
