import styles from "./page.module.css";
import BoxDatoUnico from "./components/boxDatoUnico/boxDatoUnico";
import ticketSinResolver from "./components/ticketSinResolver/ticketSinResolver";
import feedback from "./components/feedback/feedback";
import Navbar from "./components/NavBar/NavBar";
export default function Home() {
    let arrayTicketAResolver = [{ nombre: "Juan Roma", prioridad: "Urgente" }];
    
    return (
        <div className={styles.container}>
            <NavBar />
            <div className={styles.content}>
                <div className={styles.header}>
                    <h1>Home</h1>
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
}