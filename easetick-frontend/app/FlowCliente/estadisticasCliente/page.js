'use client'
import { useEffect, useContext, useState } from "react";
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
    const { userId, loading: userLoading } = useContext(TokenContext);
    const { setTitulo } = useTitle();
    const { clientStats } = useTickets({ id: userId, isCliente: true });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        setTitulo("Mis Estadísticas");
        if (clientStats.totalTickets !== undefined) {
            setIsLoading(false);
        }
    }, [setTitulo, clientStats]);

    if (userLoading || isLoading) {
        return <div>Cargando estadísticas...</div>;
    }

    if (error) {
        return <div>Error al cargar las estadísticas: {error}</div>;
    }

    const labels = ["L", "M", "X", "J", "V", "S", "D"];

    return (
        <ProtectedRoutes allowedRoles={[1]}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>Mis Estadísticas</h2>
                    <p>Revise sus métricas</p>
                </div>

                <div className={styles.lineChartsWrapper}>
                <BoxDatoUnico 
                    texto="Total Tickets" 
                    dato={clientStats.totalTickets}
                    useBoxStyle={true}
                />
                <BoxDatoUnico 
                    texto="Tiempo Promedio Resolución" 
                    dato={`${clientStats.tiempoPromedioResolucion} hrs`}
                    useBoxStyle={true}
                />
                    <LineGraph 
                        title="Tendencia Semanal" 
                        data={clientStats.tendenciaSemanal} 
                        labels={labels}
                        number={clientStats.tendenciaSemanal.reduce((a, b) => a + b, 0)}
                    />
                </div>

                <div className={styles.graphsRow}>
                    <div className={styles.pieWrapper}>
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
                        />
                    </div>
                    <div className={styles.barWrapper}>
                        <BarGraph 
                            title="Tickets por Prioridad" 
                            data={clientStats.ticketsPorPrioridad} 
                        />
                    </div>
                    <div className={styles.doughnutChartContainer}>
                        <BarGraph 
                            title="Tickets por Tipo" 
                            data={clientStats.ticketsPorTipo} 
                        />
                    </div>
                    <div className={styles.barWrapper}>
                        <BarGraph 
                            title="Comparativa de Tickets por Mes" 
                            data={clientStats.ticketsPorMes}
                            options={{
                                plugins: {
                                    legend: { display: false }
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        ticks: { stepSize: 1 }
                                    },
                                    x: {
                                        ticks: {
                                            autoSkip: false,
                                            maxRotation: 45,
                                            minRotation: 45
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
