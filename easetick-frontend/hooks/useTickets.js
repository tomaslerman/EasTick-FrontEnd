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

            } catch (error) {
                console.log(error);
            }
        };

        fetchTickets();
    }, [id]);

    return { ticketsAsignados, ticketsSinResolver, ticketsResueltos, ticketsVencenHoy, feedback, porcResueltos, detalle };
}
