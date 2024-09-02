'use client'
import styles from "./page.module.css";
import BoxDatoUnico from "@/components/BoxDatoUnico/boxDatoUnico";
import TicketSinResolver from "@/components/TicketSinResolver/ticketSinResolver";
import Feedback from "@/components/Feedback/feedback";
import { useTickets } from '@/hooks/useTickets';
import { useEffect, useState } from "react";
import useTitle from "@/hooks/useTitle";
import { PieChart } from "@/components/graficoCircular/pieChart";
import pieChartStyles from "@/components/graficoCircular/pieChart.module.css"; 
import { PieDataChart } from "@/components/graficoCircular/pieDataChart";  // Importa la función

export default function Home() {
    const { ticketsAsignados, ticketsSinResolver, ticketsResueltos, ticketsVencenHoy, feedback, porcResueltos } = useTickets({ id: 2 });
    const { setTitulo } = useTitle();
    const [pieData, setPieData] = useState(PieDataChart({ Realizados: 0, NoRealizados: 0 }));

    useEffect(() => {
        setTitulo("Home");

        if (porcResueltos) {
            setPieData(PieDataChart(porcResueltos));
        }
    }, [porcResueltos, setTitulo]);

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
                    <TicketSinResolver tickets={ticketsSinResolver} />
                </div>
                <div className={styles.rightContent}>
                    <div >
                        <div className={pieChartStyles.pieContainer}>
                            <PieChart data={pieData} />  {/* Pasa los datos al componente */}
                        </div>
                    </div>
                    <Feedback feedback={feedback} />
                </div>
            </div>
        </div>
    );
}