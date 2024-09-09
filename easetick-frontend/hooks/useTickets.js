'use client'
import { useState, useEffect } from 'react';

export function useTickets({ id }) {
    const [ticketsAsignados, setTicketsAsignados] = useState([]);
    const [ticketsSinResolver, setTicketsSinResolver] = useState([]);
    const [ticketsResueltos, setTicketsResueltos] = useState([]);
    const [ticketsVencenHoy, setTicketsVencenHoy] = useState([]);
    const [feedback, setFeedback] = useState();
    const [porcResueltos, setPorcResueltos] = useState();
    const [detalle, setDetalle] = useState();
    const [semana, setSemana] = useState();
    const [resueltosSemana, setResueltosSemana] = useState();
    const [promedioResolucion, setPromedioResolucion] = useState();
    const [ticketsPrioridad, setTicketsPrioridad] = useState();
    const [porcentajeEstado, setPorcentajeEstado] = useState();
    useEffect(() => {
        const fetchTickets = async () => {
            try {
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

                const resPromedioResolucion = await fetch(`http://localhost:5000/tickets/promedioHorasResolucionPorDiaDeLaSemana/${id}`);
                const dataPromedioResolucion = await resPromedioResolucion.json();
                setPromedioResolucion(dataPromedioResolucion.message);

                const resTicketsPrioridad = await fetch(`http://localhost:5000/tickets/cantidadTicketsPorPrioridad/${id}`);
                const dataTicketsPrioridad = await resTicketsPrioridad.json();
                setTicketsPrioridad(dataTicketsPrioridad.message);

                const resPorcentajeEstado = await fetch(`http://localhost:5000/tickets/porcentajeTicketsPorEstado/${id}`);
                const dataPorcentajeEstado = await resPorcentajeEstado.json();
                setPorcentajeEstado(dataPorcentajeEstado.message);

            } catch (error) {
                console.log(error);
            }
        };

        fetchTickets();
    }, [id]);

    return { ticketsAsignados, ticketsSinResolver, ticketsResueltos, ticketsVencenHoy, feedback, porcResueltos, detalle, semana, resueltosSemana, promedioResolucion, ticketsPrioridad, porcentajeEstado};
}
