'use client'
import styles from "./page.module.css";
import BoxDatoUnico from "@/components/BoxDatoUnico/boxDatoUnico";
import TicketSinResolver from "@/components/TicketSinResolver/ticketSinResolver";
import Feedback from "@/components/Feedback/feedback";
import Navbar from "@/components/NavBar/NavBar";

export default function Home() {
    let arrayTicketAResolver = [
        { nombre: "Juan Roma", prioridad: "Urgente" },
        { nombre: "Tomas Lerman", prioridad: "Baja" }
    ];
    
    return (
        <div>
            <div className={styles.content}>
                <div className={styles.dashboard}>
                    <BoxDatoUnico texto={"Vence hoy"} dato={1} />
                    <BoxDatoUnico texto={"Tickets sin resolver"} dato={3} />
                    <BoxDatoUnico texto={"Tickets resueltos"} dato={3} />
                    <BoxDatoUnico texto={"Vence hoy"} dato={3} />
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
