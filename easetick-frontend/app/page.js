import styles from "./page.module.css";
import BoxDatoUnico from "@/components/BoxDatoUnico/boxDatoUnico";;
import TicketSinResolver from "@/components/TicketSinResolver/ticketSinResolver";
import feedback from "@/components/Feedback/feedback";
import Navbar from "@/components/NavBar/NavBar";
export default function Home() {
    let arrayTicketAResolver = [{ nombre: "Juan Roma", prioridad: "Urgente" }];
    
    return (
        <div>
            <div className={styles.content}>
                <div className={styles.header}>
                   
                </div>
                <div className={styles.dashboard}>
                    <BoxDatoUnico texto={"Vence hoy"} dato={1} />
                    <BoxDatoUnico texto={"hola"} dato={3} />
                    <BoxDatoUnico texto={"hola"} dato={3} />
                    <BoxDatoUnico texto={"hola"} dato={3} />
                    <TicketSinResolver props={arrayTicketAResolver} />
                </div>
            </div>
        </div>
    );
};