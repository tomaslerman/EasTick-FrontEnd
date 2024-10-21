'use client';

import React from 'react';
import Chat from '@/components/Chat/Chat';
import { useParams } from 'next/navigation';

const TicketPage = () => {
    const { id } = useParams();

    return (
        <div>
            <h1>Ticket #{id}</h1>
            <Chat idTicket={id} />
        </div>
    );
};

export default TicketPage;
