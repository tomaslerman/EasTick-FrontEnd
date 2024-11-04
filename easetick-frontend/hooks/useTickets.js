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
        ticketsPorEstado: {
            'Pendiente': 0,
            'En Proceso': 0,
            'Resuelto': 0,
            'Cerrado': 0
        },
        ticketsPorPrioridad: {
            'Baja': 0,
            'Media': 0,
            'Alta': 0,
            'Crítica': 0
        },
        tiempoPromedioResolucion: 0,
        ticketsPorTipo: {
            'Pregunta': 0,
            'Incidente': 0,
            'Sugerencia': 0,
            'Mantenimiento': 0,
            'Reclamo': 0
        },
        tendenciaSemanal: [0, 0, 0, 0, 0, 0, 0],
        ticketsPorMes: {
            'Enero': 0,
            'Febrero': 0,
            'Marzo': 0,
            'Abril': 0,
            'Mayo': 0,
            'Junio': 0,
            'Julio': 0,
            'Agosto': 0,
            'Septiembre': 0,
            'Octubre': 0,
            'Noviembre': 0,
            'Diciembre': 0
        }
    });

    useEffect(() => {
        const fetchClientStats = async () => {
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
                        totalTickets: totalData.message || 0,
                        ticketsPorEstado: estadoData.message || prev.ticketsPorEstado,
                        ticketsPorPrioridad: prioridadData.message || prev.ticketsPorPrioridad,
                        tiempoPromedioResolucion: tiempoData.message || 0,
                        ticketsPorTipo: tipoData.message || prev.ticketsPorTipo,
                        tendenciaSemanal: tendenciaData.message || prev.tendenciaSemanal,
                        ticketsPorMes: mesData.message || prev.ticketsPorMes
                    }));

                } catch (error) {
                    console.error('Error fetching client statistics:', error);
                }
            }
        };

        const fetchTickets = async () => {
            try {
                if (isCliente) {
                    const resTicketsCliente = await fetch(`http://localhost:5000/tickets/cliente/${id}`);
                    const dataTicketsCliente = await resTicketsCliente.json();
                    setDetalle(dataTicketsCliente.message);
                } else {
                    // Obtener tickets del empleado (lógica existente)
                    const resAsignados = await fetch(`http://localhost:5000/tickets/${id}`);
                    const dataAsignados = await resAsignados.json();
                    setTicketsAsignados(dataAsignados.message);
                    const resSinResolver = await fetch(`http://localhost:5000/tickets/ticketsSinResolver/${id}`);
                    const dataSinResolver = await resSinResolver.json();
                    setTicketsSinResolver(dataSinResolver.message);
                    const resResueltos = await fetch(`http://localhost:5000/tickets/ticketsResueltos/${id}`);
                    const dataResueltos = await resResueltos.json();
                    setTicketsResueltos(dataResueltos.message);
                    const resVencenHoy = await fetch(`http://localhost:5000/tickets/ticketsVencenHoy/${id}`);
                    const dataVencenHoy = await resVencenHoy.json();
                    setTicketsVencenHoy(dataVencenHoy.message);
                    const resFeedback = await fetch(`http://localhost:5000/tickets/FeedBackEmpleado/${id}`);
                    const dataFeedback = await resFeedback.json();
                    setFeedback(dataFeedback.message);
                    const resPorcResueltos = await fetch(`http://localhost:5000/tickets/porcentajeTicketsResueltos/${id}`);
                    const dataPorcResueltos = await resPorcResueltos.json();
                    setPorcResueltos(dataPorcResueltos.message);
                    const resDetalle = await fetch(`http://localhost:5000/tickets/detalleTicket/${id}`);
                    const dataDetalle = await resDetalle.json();
                    setDetalle(dataDetalle.message);
                    const resSemana = await fetch(`http://localhost:5000/tickets/ticketsPorDiaDeLaSemana/${id}`);
                    const dataSemana = await resSemana.json();
                    setSemana(dataSemana.message);
                    const resResueltosSemana = await fetch(`http://localhost:5000/tickets/ticketsResueltosPorDiaDeLaSemana/${id}`);
                    const dataResueltosSemana = await resResueltosSemana.json();
                    setResueltosSemana(dataResueltosSemana.message);
                    const resTicketsPrioridad = await fetch(`http://localhost:5000/tickets/cantidadTicketsPorPrioridad/${id}`);
                    const dataTicketsPrioridad = await resTicketsPrioridad.json();
                    setTicketsPrioridad(dataTicketsPrioridad.message);
                    const resPorcentajeEstado = await fetch(`http://localhost:5000/tickets/porcentajeTicketsPorEstado/${id}`);
                    const dataPorcentajeEstado = await resPorcentajeEstado.json();
                    setPorcentajeEstado(dataPorcentajeEstado.message);
                    const resCantidadTipo = await fetch(`http://localhost:5000/tickets/cantidadTicketsPorTipo/${id}`);
                    const dataCantidadTipo = await resCantidadTipo.json();
                    setCantidadTipo(dataCantidadTipo.message);
                    const resCalificacionesUsuario = await fetch(`http://localhost:5000/tickets/calificacionesPorUsuario/${id}`);
                    const dataCalificacionesUsuario = await resCalificacionesUsuario.json();
                    setCalifiacionesUsuario(dataCalificacionesUsuario.message);
                    
                    const resClientesEmpresa = await fetch(`http://localhost:5000/tickets/empresasClientes/${id}`);
                    const dataClientesEmpresa = await resClientesEmpresa.json();
                    setClientesEmpresa(dataClientesEmpresa.message);
                    const resEmpleadosEmpresa = await fetch(`http://localhost:5000/tickets/empleadosYTickets/${id}`);
                    const dataEmpleadosEmpresa = await resEmpleadosEmpresa.json();
                    setEmpleadosEmpresa(dataEmpleadosEmpresa.message);
                }
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        if (id) {
            fetchClientStats();
            fetchTickets();
        }
    }, [id, isCliente]);

    return { 
        ticketsAsignados, 
        ticketsSinResolver, 
        ticketsResueltos, 
        ticketsVencenHoy, 
        feedback, 
        porcResueltos, 
        detalle, 
        semana, 
        resueltosSemana, 
        ticketsPrioridad, 
        porcentajeEstado, 
        cantidadTipo, 
        calificacionesUsuario, 
        clientesEmpresa, 
        empleadosEmpresa, 
        clientStats 
    };
}
