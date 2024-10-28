import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

export const useSocket = (ticketId) => {
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('http://localhost:5000');

    socket.current.on('connect', () => {
      console.log('Conectado al servidor de WebSocket');
      if (ticketId) {
        socket.current.emit('join-chat', ticketId);
      }
    });

    return () => {
      if (ticketId) {
        socket.current.emit('leave-chat', ticketId);
      }
      socket.current.disconnect();
    };
  }, [ticketId]);

  return socket.current;
};
