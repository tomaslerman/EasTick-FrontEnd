'use client'
import styles from "./page.module.css";
import BoxDatoUnico from "@/components/BoxDatoUnico/boxDatoUnico";
import TicketSinResolver from "@/components/TicketSinResolver/ticketSinResolver";
import Feedback from "@/components/Feedback/feedback";
import Navbar from "@/components/NavBar/NavBar";
import { useTickets } from '@/hooks/useTickets';

export default function Home() {
    let arrayTicketAResolver = [
        { nombre: "Juan Roma", prioridad: "Urgente" },
        { nombre: "Tomas Lerman", prioridad: "Baja" }
    ];
    const { ticketsAsignados, ticketsSinResolver, ticketsResueltos, ticketsVencenHoy } = useTickets({ id: 2 });

    return (
        <div>
            <div className={styles.content}>
                <div className={styles.dashboard}>
                    <BoxDatoUnico texto={"Tickets asignados"} dato={ticketsAsignados.length} />
                    <BoxDatoUnico texto={"Tickets sin resolver"} dato={ticketsSinResolver.length} />
                    <BoxDatoUnico texto={"Tickets resueltos"} dato={ticketsResueltos.length} />
                    <BoxDatoUnico texto={"Vence hoy"} dato={ticketsVencenHoy.length} />
                </div>

                <div className={styles.mainContent}>
                    <div className={styles.leftContent}>
                        <TicketSinResolver props={arrayTicketAResolver} />
                    </div>
                    <div className={styles.rightContent}>
                        <Feedback total={10} positivo={50} neutral={20} negativo={30} />
                    </div>
                </div>
            </div>
        </div>
    );
}

