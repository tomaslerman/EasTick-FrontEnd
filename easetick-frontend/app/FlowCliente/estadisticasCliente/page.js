'use client'
import { useEffect, useContext } from "react";
import { useTickets } from '@/hooks/useTickets';
import useTitle from "@/hooks/useTitle";
import { TokenContext } from "@/context/TokenContext";
import styles from "./page.module.css";
import Titulo from "@/components/Titulo/Titulo";
import { LineGraph } from "@/components/GraficoLineal/graficoLineal";
import BarGraph from "@/components/Bar/bar";
import { PieChart } from "@/components/graficoCircular/pieChart";
import DoughnutChart from "@/components/Doughnut/doughnut";
import BoxDatoUnico from "@/components/BoxDatoUnico/boxDatoUnico";
import { ProtectedRoutes } from "@/app/utils/ProtectedRoutes";

export default function EstadisticasCliente() {
    const { userId, loading } = useContext(TokenContext);
    const { setTitulo } = useTitle();
    const { clientStats } = useTickets({ id: userId, isCliente: true });
    
    useEffect(() => {
        setTitulo("Mis Estadísticas");
    }, [setTitulo]);

    const labels = ["D", "L", "M", "X", "J", "V", "S"];
    const labelsTipo = ["Pregunta", "Incidente", "Sugerencia", "Mantenimiento", "Reclamo"];

    if (loading) return null;

    console.log('Datos de tickets por mes:', clientStats.ticketsPorMes);

    return (
        <ProtectedRoutes allowedRoles={[1]}>
            <div className={styles.container}>
                <Titulo titulo={"Mis Estadísticas"} subtitulo={"Revise sus métricas"} />
                
                <div className={styles.statsOverview}>
                    <BoxDatoUnico 
                        texto="Total Tickets" 
                        dato={clientStats.totalTickets} 
                    />
                    <BoxDatoUnico 
                        texto="Tiempo Promedio Resolución" 
                        dato={`${clientStats.tiempoPromedioResolucion} hrs`} 
                    />
                </div>

                <div className={styles.graphsContainer}>
                    <div className={styles.graphWrapper}>
                        <PieChart 
                            data={{
                                labels: Object.keys(clientStats.ticketsPorEstado),
                                datasets: [{
                                    data: Object.values(clientStats.ticketsPorEstado),
                                    backgroundColor: [
                                        'rgba(75, 192, 192, 0.8)',
                                        'rgba(54, 162, 235, 0.8)',
                                        'rgba(255, 206, 86, 0.8)',
                                        'rgba(255, 99, 132, 0.8)',
                                    ],
                                    borderWidth: 1
                                }]
                            }}
                            title="Estado de Tickets"
                            options={{
                                responsive: true,
                                maintainAspectRatio: false
                            }}
                        />
                    </div>
                    <div className={styles.graphWrapper}>
                        <BarGraph 
                            title="Tickets por Prioridad" 
                            data={clientStats.ticketsPorPrioridad} 
                        />
                    </div>
                    <div className={styles.graphWrapper}>
                        <BarGraph 
                            title="Tickets por Tipo" 
                            data={clientStats.ticketsPorTipo} 
                        />
                    </div>
                    <div className={styles.graphWrapper}>
                        <LineGraph 
                            title="Tendencia Semanal" 
                            data={clientStats.tendenciaSemanal} 
                            labels={labels}
                            number={clientStats.tendenciaSemanal.reduce((a, b) => a + b, 0)}
                            containerStyles={{ height: '100%', width: '100%' }}
                        />
                    </div>
                    <div className={styles.graphWrapper}>
                        <BarGraph 
                            title="Comparativa de Tickets por Mes" 
                            data={clientStats.ticketsPorMes}
                            options={{
                                plugins: {
                                    legend: {
                                        display: false
                                    }
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        ticks: {
                                            stepSize: 1
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </ProtectedRoutes>
    );
}
