import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from '@/context/TokenContext';
import styles from './Chat.module.css';  // Importa los estilos
import dynamic from 'next/dynamic';

// Cargar dinámicamente el componente de mensajes
const MensajesComponent = dynamic(() => import('./MensajesComponent'), {
  ssr: false,
});

const Chat = ({ idTicket, asunto, mensajeInicial, prioridad, tipo, estadoTicket }) => {
    const [mensajes, setMensajes] = useState([]);
    const [nuevoMensaje, setNuevoMensaje] = useState('');
    const { userId, userRole } = useContext(TokenContext);
    const [ticketCerrado, setTicketCerrado] = useState(estadoTicket === 2);

    useEffect(() => {
        cargarMensajes();
    }, [idTicket]);

    const cargarMensajes = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/tickets/${idTicket}/mensajes`);
            setMensajes(response.data.mensajes);
        } catch (error) {
            console.error('Error al cargar mensajes:', error);
        }
    };

    const enviarMensaje = async (e) => {
        e.preventDefault();
        if (!nuevoMensaje.trim() || ticketCerrado) return;

        try {
            await axios.post(`http://localhost:5000/tickets/${idTicket}/mensaje`, {
                idUsuario: userId,
                contenido: nuevoMensaje,
                esEmpleado: userRole === 2
            });
            setNuevoMensaje('');
            cargarMensajes();
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
        }
    };

    const cerrarTicket = async () => {
        try {
            await axios.post(`http://localhost:5000/tickets/${idTicket}/cerrar`);
            setTicketCerrado(true);
            alert('Ticket cerrado exitosamente');
        } catch (error) {
            console.error('Error al cerrar ticket:', error);
            alert('Error al cerrar el ticket');
        }
    };

    return (
        <div className={styles.chatContainer}>
            <h1 className={styles.asunto}>{asunto}</h1>
            <div className={styles.ticketInfo}>
                <p><strong>Prioridad:</strong> {prioridad}</p>
                <p><strong>Tipo:</strong> {tipo}</p>
                <p><strong>Estado:</strong> {ticketCerrado ? 'Cerrado' : 'Abierto'}</p>
            </div>
            <div className={styles.mensajeInicial}>
                <h3>Mensaje inicial:</h3>
                <p>{mensajeInicial}</p>
            </div>
            <div className={styles.mensajes}>
                {mensajes.map((mensaje, index) => (
                    <div key={index} className={styles.mensaje}>
                        <strong>{mensaje.fkCliente ? mensaje.fkCliente.nombre : mensaje.fkEmpleado.nombre}:</strong>
                        <p>{mensaje.contenido}</p>
                    </div>
                ))}
            </div>
            {!ticketCerrado && (
                <form onSubmit={enviarMensaje} className={styles.formulario}>
                    <input
                        type="text"
                        value={nuevoMensaje}
                        onChange={(e) => setNuevoMensaje(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className={styles.input}
                    />
                    <button type="submit" className={styles.botonEnviar}>Enviar</button>
                </form>
            )}
            {userRole === 2 && !ticketCerrado && (
                <button onClick={cerrarTicket} className={styles.botonCerrar}>Cerrar Ticket</button>
            )}
            {ticketCerrado && (
                <p className={styles.ticketCerradoMensaje}>Este ticket está cerrado. No se pueden enviar más mensajes.</p>
            )}
        </div>
    );
};

export default Chat;
