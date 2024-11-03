'use client'
import { useState, useEffect } from 'react';

export function useTickets({ id, isCliente = false }) {
    const [ticketsAsignados, setTicketsAsignados] = useState([]);
    const [ticketsSinResolver, setTicketsSinResolver] = useState([]);
    const [ticketsResueltos, setTicketsResueltos] = useState([]);
    const [ticketsVencenHoy, setTicketsVencenHoy] = useState([]);
    const [feedback, setFeedback] = useState();
    const [porcResueltos, setPorcResueltos] = useState();
    const [detalle, setDetalle] = useState();
    const [semana, setSemana] = useState();
    const [resueltosSemana, setResueltosSemana] = useState();
    const [ticketsPrioridad, setTicketsPrioridad] = useState();
    const [porcentajeEstado, setPorcentajeEstado] = useState();
    const [cantidadTipo, setCantidadTipo] = useState();
    const [calificacionesUsuario, setCalifiacionesUsuario] = useState();
    const [clientesEmpresa, setClientesEmpresa] = useState();
    const [empleadosEmpresa, setEmpleadosEmpresa] = useState();
    const [clientStats, setClientStats] = useState({
        totalTickets: 0,
        ticketsPorEstado: {},
        ticketsPorPrioridad: {},
        tiempoPromedioResolucion: 0,
        ticketsPorTipo: {},
        tendenciaSemanal: [],
        ticketsPorMes: {},
        distribucionPorDia: null
    });

    useEffect(() => {
        const fetchData = async () => {
            if (isCliente && id) {
                try {
                    const [
                        totalRes,
                        estadoRes,
                        prioridadRes,
                        tiempoRes,
                        tipoRes,
                        tendenciaRes,
                        mesRes
                    ] = await Promise.all([
                        fetch(`http://localhost:5000/tickets/totalTicketsCliente/${id}`),
                        fetch(`http://localhost:5000/tickets/ticketsPorEstadoCliente/${id}`),
                        fetch(`http://localhost:5000/tickets/ticketsPorPrioridadCliente/${id}`),
                        fetch(`http://localhost:5000/tickets/tiempoPromedioResolucionCliente/${id}`),
                        fetch(`http://localhost:5000/tickets/ticketsPorTipoCliente/${id}`),
                        fetch(`http://localhost:5000/tickets/tendenciaSemanalCliente/${id}`),
                        fetch(`http://localhost:5000/tickets/ticketsPorMesCliente/${id}`)
                    ]);

                    const [
                        totalData,
                        estadoData,
                        prioridadData,
                        tiempoData,
                        tipoData,
                        tendenciaData,
                        mesData
                    ] = await Promise.all([
                        totalRes.json(),
                        estadoRes.json(),
                        prioridadRes.json(),
                        tiempoRes.json(),
                        tipoRes.json(),
                        tendenciaRes.json(),
                        mesRes.json()
                    ]);

                    setClientStats(prev => ({
                        ...prev,
                        totalTickets: totalData.message,
                        ticketsPorEstado: estadoData.message,
                        ticketsPorPrioridad: prioridadData.message,
                        tiempoPromedioResolucion: tiempoData.message,
                        ticketsPorTipo: tipoData.message,
                        tendenciaSemanal: tendenciaData.message,
                        ticketsPorMes: mesData.message,
                        distribucionPorDia: distribucionData.success ? distribucionData : {
                            message: {
                                labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
                                datasets: [{
                                    label: 'Cantidad de Tickets',
                                    data: [0, 0, 0, 0, 0, 0, 0],
                                    backgroundColor: 'rgba(54, 162, 235, 0.8)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    borderWidth: 1,
                                    borderRadius: 5
                                }]
                            }
                        }
                    }));

                    console.log('Distribución por día:', distribucionData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();
    }, [id, isCliente]);

    return { ticketsAsignados, ticketsSinResolver, ticketsResueltos, ticketsVencenHoy, feedback, porcResueltos, detalle, semana, resueltosSemana, ticketsPrioridad, porcentajeEstado, cantidadTipo, calificacionesUsuario, clientesEmpresa, empleadosEmpresa, clientStats };
}
