import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

export const useClientes = (userId) => {
    const { data: clientes, isLoading, error } = useQuery(
        ['clientes', userId],
        async () => {
            const response = await fetch(`/api/tickets/empresasClientes/${userId}`);
            const data = await response.json();
            return data.message;
        },
        {
            staleTime: 5 * 60 * 1000, // Cache por 5 minutos
            cacheTime: 10 * 60 * 1000, // Mantener en caché por 10 minutos
            retry: 2
        }
    );

    return { clientes, isLoading, error };
}; 