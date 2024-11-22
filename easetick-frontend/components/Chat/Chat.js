import React, { useState, useEffect, useContext } from 'react';
import { TokenContext } from '@/context/TokenContext';
import io from 'socket.io-client';
import axios from 'axios';
import styles from './Chat.module.css';  // Importa los estilos
import { FaStar } from 'react-icons/fa'; // Necesitarás instalar react-icons

const Chat = ({ idTicket, asunto, mensajeInicial, prioridad, tipo, estadoTicket }) => {
    const [mensajes, setMensajes] = useState([]);
    const [nuevoMensaje, setNuevoMensaje] = useState('');
    const [socket, setSocket] = useState(null);
    const [ticketCerrado, setTicketCerrado] = useState(estadoTicket === 2);
    const { userId, userRole } = useContext(TokenContext);
    const [mostrarCalificacion, setMostrarCalificacion] = useState(false);
    const [calificacion, setCalificacion] = useState(0);
    const [calificacionEnviada, setCalificacionEnviada] = useState(false);
    const [ticketYaCalificado, setTicketYaCalificado] = useState(false);

    // Inicializar socket
    useEffect(() => {
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    // Unirse al chat y cargar mensajes
    useEffect(() => {
        if (!socket) return;

        // Unirse al chat
        socket.emit('join-chat', idTicket);
        console.log('Uniéndose al chat:', idTicket);

        // Cargar mensajes existentes
        const cargarMensajes = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/tickets/${idTicket}/mensajes`);
                if (response.data.success) {
                    // Filtrar mensajes duplicados basados en el contenido y timestamp
                    const mensajesUnicos = response.data.mensajes.filter((mensaje, index, self) =>
                        index === self.findIndex((m) => (
                            m.contenido === mensaje.contenido &&
                            m.fechacreacion === mensaje.fechacreacion
                        ))
                    );
                    setMensajes(mensajesUnicos);
                }
            } catch (error) {
                console.error('Error al cargar mensajes:', error);
            }
        };
        cargarMensajes();

        // Escuchar nuevos mensajes
        socket.on('message-received', (mensaje) => {
            console.log('Mensaje recibido:', mensaje);
            setMensajes(prev => [...prev, mensaje]);
        });

        // Escuchar cierre de ticket
        socket.on('ticket-closed', (ticketId) => {
            if (ticketId === idTicket) {
                setTicketCerrado(true);
                // Actualizar el estado del ticket en tiempo real
                verificarEstadoTicket();
            }
        });

        return () => {
            socket.off('message-received');
            socket.off('ticket-closed');
        };
    }, [socket, idTicket]);

    const enviarMensaje = async (e) => {
        e.preventDefault();
        if (!nuevoMensaje.trim() || !socket) return;

        console.log('Enviando mensaje:', {
            ticketId: idTicket,
            message: nuevoMensaje,
            userId: userId,
            isEmployee: userRole === 2
        });

        socket.emit('new-message', {
            ticketId: idTicket,
            message: nuevoMensaje,
            userId: userId,
            isEmployee: userRole === 2
        });

        setNuevoMensaje('');
    };

    // Verificar estado inicial del ticket
    useEffect(() => {
        const verificarEstadoTicket = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/tickets/informacionCompleta/${idTicket}`);
                setTicketCerrado(response.data.message.fkestado === 2);
            } catch (error) {
                console.error('Error al verificar estado del ticket:', error);
            }
        };

        verificarEstadoTicket();
    }, [idTicket]);

    const cerrarTicket = async () => {
        if (!window.confirm('¿Estás seguro que deseas cerrar este ticket?')) {
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/tickets/${idTicket}/cerrar`);
            
            if (response.data.success) {
                setTicketCerrado(true);
                socket.emit('ticket-closed', idTicket);
                // Mostrar calificación solo si es cliente
                if (userRole === 1) {
                    setMostrarCalificacion(true);
                }
                alert('Ticket cerrado exitosamente');
            }
        } catch (error) {
            console.error('Error al cerrar ticket:', error);
            alert('Error al cerrar el ticket. Por favor, intente nuevamente.');
        }
    };

    const enviarCalificacion = async () => {
        try {
            // Solo permitir calificar si es cliente (userRole === 1)
            if (userRole !== 1) {
                alert('Solo los clientes pueden calificar tickets');
                return;
            }

            const response = await axios.post(`http://localhost:5000/tickets/${idTicket}/calificar`, {
                idUsuario: userId,
                puntaje: calificacion
            });

            if (response.data.success) {
                setCalificacionEnviada(true);
                alert('¡Gracias por tu calificación!');
            }
        } catch (error) {
            console.error('Error al enviar calificación:', error);
            alert(error.response?.data?.error || 'Error al enviar la calificación');
        }
    };

    // Agregar useEffect para verificar si el ticket ya fue calificado
    useEffect(() => {
        const verificarCalificacion = async () => {
            if (ticketCerrado && userRole === 1) {
                try {
                    const response = await axios.get(
                        `http://localhost:5000/tickets/${idTicket}/verificarCalificacion`
                    );
                    setTicketYaCalificado(response.data.yaCalificado);
                    if (response.data.yaCalificado) {
                        setCalificacionEnviada(true);
                    }
                } catch (error) {
                    console.error('Error al verificar calificación:', error);
                }
            }
        };

        verificarCalificacion();
    }, [ticketCerrado, idTicket, userRole]);

    return (
        
        <div className={styles.chatContainer}>
            <div className={styles.header}>
                <h2 className={styles.h2}>{asunto}</h2>
                <div className={styles.infoTicket}>
                    <span>Prioridad: {prioridad}</span>
                    <span>Tipo: {tipo}</span>
                    <span>Estado: {ticketCerrado ? 'Cerrado' : 'Abierto'}</span>
                </div>
            </div>

            <div className={styles.mensajeInicial}>
                <h3>Mensaje inicial:</h3>
                <p>{mensajeInicial}</p>
            </div>

            <div className={styles.mensajes}>
                {mensajes.map((mensaje, index) => (
                    <div 
                        key={index} 
                        className={`${styles.mensaje} ${
                            mensaje.fkCliente ? styles.mensajeCliente : styles.mensajeEmpleado
                        }`}
                    >
                        <strong>{mensaje.fkCliente ? mensaje.fkCliente.nombre : 
                                mensaje.fkEmpleado ? mensaje.fkEmpleado.nombre : 'Usuario'}</strong>
                        <p>{mensaje.contenido}</p>
                        
                    </div>
                ))}
            </div>

            {!ticketCerrado && (
                <>
                    {userRole === 2 && (
                        <button onClick={cerrarTicket} className={styles.botonCerrar}>
                            Cerrar Ticket
                        </button>
                    )}
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
                </>
            )}

            {ticketCerrado && userRole === 1 && !ticketYaCalificado && !calificacionEnviada && (
                <div className={styles.calificacionContainer}>
                    <h3>Califica la atención recibida</h3>
                    <div className={styles.estrellas}>
                        {[1, 2, 3, 4, 5].map((estrella) => (
                            <FaStar
                                key={estrella}
                                className={`${styles.estrella} ${
                                    estrella <= calificacion ? styles.estrellaActiva : ''
                                }`}
                                onClick={() => setCalificacion(estrella)}
                            />
                        ))}
                    </div>
                    <button 
                        onClick={enviarCalificacion}
                        disabled={calificacion === 0}
                        className={styles.botonCalificar}
                    >
                        Enviar Calificación
                    </button>
                </div>
            )}

            {(calificacionEnviada || ticketYaCalificado) && (
                <p className={styles.gracias}>¡Gracias por tu calificación!</p>
            )}

            {ticketCerrado && (
                <p className={styles.ticketCerradoMensaje}>
                    Este ticket está cerrado. No se pueden enviar más mensajes.
                </p>
            )}
        </div>
    );
};

export default Chat;
