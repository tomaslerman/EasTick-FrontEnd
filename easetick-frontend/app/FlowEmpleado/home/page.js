'use client'
import { useEffect, useState, useContext } from "react";
import { useTickets } from '@/hooks/useTickets';
import useTitle from "@/hooks/useTitle";
import { TokenContext } from "@/context/TokenContext";
import styles from "./page.module.css";
import BoxDatoUnico from "@/components/BoxDatoUnico/boxDatoUnico";
import TicketSinResolver from "@/components/TicketSinResolver/ticketSinResolver";
import Feedback from "@/components/Feedback/feedback";
import { PieChart } from "@/components/graficoCircular/pieChart";
import { PieDataChart } from "@/components/graficoCircular/pieDataChart";  
import Recordatorios from "@/components/Recordatorio/Recordatorio";
import { ProtectedRoutes } from "@/app/utils/ProtectedRoutes";
export default function Home() {
    const { userId, loading } = useContext(TokenContext);
    const { ticketsAsignados, ticketsSinResolver, ticketsResueltos, ticketsVencenHoy, feedback, porcResueltos } = useTickets({ id: userId || '' });
    const { setTitulo } = useTitle();
    const [pieData, setPieData] = useState(PieDataChart({ Realizados: 0, NoRealizados: 0 }));

    useEffect(() => {
        if (!loading) {
            setTitulo("Home");
            if (porcResueltos) {
                setPieData(PieDataChart(porcResueltos));
            }
        }
    }, [porcResueltos, setTitulo, loading]);

    if (loading) return;

    return (
        <ProtectedRoutes allowedRoles={[2]}>
            <div className={styles.content}>
                <div className={styles.dashboard}>
                    <BoxDatoUnico texto={"Tickets asignados"} dato={ticketsAsignados?.length || 0} />
                    <BoxDatoUnico texto={"Tickets sin resolver"} dato={ticketsSinResolver?.length || 0} />
                    <BoxDatoUnico texto={"Tickets resueltos"} dato={ticketsResueltos?.length || 0} />
                    <BoxDatoUnico texto={"Vence hoy"} dato={ticketsVencenHoy?.length || 0} />
                </div>
                <div className={styles.mainContent}>
                    <div className={styles.leftContainer}>
                        <TicketSinResolver tickets={ticketsSinResolver || []} />
                        <Feedback feedback={feedback || []} />
                    </div>
                    <div className={styles.rightContainer}>
                        <div className={styles.pieContainerWrapper}>
                            <PieChart data={pieData} title="% Tickets resueltos" />
                        </div>
                        <Recordatorios />
                    </div>
                </div>
            </div>
        </ProtectedRoutes>
    );
}