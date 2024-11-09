'use client';

import React, { useState, useEffect } from 'react';
import Chat from '@/components/Chat/Chat';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { ProtectedRoutes } from '@/app/utils/ProtectedRoutes';

const TicketPage = () => {
    const { id } = useParams();
    const [ticketInfo, setTicketInfo] = useState(null);

    useEffect(() => {
        const fetchTicketInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/tickets/informacionCompleta/${id}`);
                setTicketInfo(response.data.message);
            } catch (error) {
                console.error('Error al obtener información del ticket:', error);
            }
        };

        fetchTicketInfo();
    }, [id]);

    if (!ticketInfo) {
        return <div>Cargando...</div>;
    }

    return (
        <ProtectedRoutes allowedRoles={[2, 3]}>
            <div>
            <h1>Ticket #{id}</h1>
            <Chat 
                idTicket={id} 
                asunto={ticketInfo.asunto} 
                mensajeInicial={ticketInfo.mensaje}
                prioridad={ticketInfo.prioridad.nombre}
                tipo={ticketInfo.tipo.nombre}
            />
        </div>
        </ProtectedRoutes>
    );
};

export default TicketPage;
