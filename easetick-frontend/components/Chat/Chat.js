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
    const [archivo, setArchivo] = useState(null);

    // Inicializar socket y cargar mensajes iniciales
    useEffect(() => {
        // Cargar mensajes históricos
        const cargarMensajesHistoricos = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/tickets/${idTicket}/mensajes`);
                if (response.data.success) {
                    setMensajes(response.data.mensajes);
                }
            } catch (error) {
                console.error('Error al cargar mensajes:', error);
            }
        };

        // Inicializar socket
        const newSocket = io('http://localhost:5000', {
            transports: ['polling', 'websocket'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            timeout: 20000,
            withCredentials: true
        });

        newSocket.on('connect', () => {
            console.log('Conectado al servidor de Socket.IO');
            setSocket(newSocket);
            newSocket.emit('join-chat', idTicket);
        });

        newSocket.on('connect_error', (error) => {
            console.error('Error de conexión Socket.IO:', error);
        });

        newSocket.on('message-received', (nuevoMensaje) => {
            setMensajes(prevMensajes => {
                const mensajeExiste = prevMensajes.some(m => m.id === nuevoMensaje.id);
                if (mensajeExiste) return prevMensajes;
                return [...prevMensajes, nuevoMensaje];
            });
        });

        cargarMensajesHistoricos();

        // Cleanup
        return () => {
            if (newSocket) {
                newSocket.off('message-received');
                newSocket.disconnect();
            }
        };
    }, [idTicket]);

    const renderMensaje = (mensaje) => {
        const nombreUsuario = mensaje.fkEmpleado?.nombre || mensaje.fkCliente?.nombre || 'Usuario';
        const esUsuarioActual = (mensaje.fkEmpleado && userRole === 2) || (mensaje.fkCliente && userRole === 1);

        return (
            <div key={mensaje.id} className={`${styles.mensaje} ${esUsuarioActual ? styles.mensajePropio : styles.mensajeOtro}`}>
                <div className={styles.mensajeHeader}>
                    <span className={styles.usuario}>{nombreUsuario}</span>
                    <span className={styles.fecha}>
                        {new Date(mensaje.fechacreacion).toLocaleString()}
                    </span>
                </div>
                
                <div className={styles.contenidoMensaje}>
                    {mensaje.contenido && (
                        <div className={styles.contenido}>{mensaje.contenido}</div>
                    )}
                    
                    {mensaje.archivo_url && (
                        <div className={styles.archivo}>
                            <a 
                                href={mensaje.archivo_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={styles.archivoLink}
                            >
                                📎 {mensaje.archivo_nombre || 'Archivo adjunto'}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const enviarMensaje = async (e) => {
        e.preventDefault();
        if ((!nuevoMensaje.trim() && !archivo) || !socket) return;

        try {
            if (archivo) {
                // Convertir archivo a base64 de manera asíncrona
                const base64File = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const base64 = reader.result.split(',')[1];
                        resolve(base64);
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(archivo);
                });

                // Enviar mensaje con archivo
                socket.emit('send-message', {
                    ticketId: idTicket,
                    userId: userId,
                    contenido: nuevoMensaje.trim(),
                    isEmployee: userRole === 2,
                    archivo: {
                        data: base64File,
                        type: archivo.type,
                        name: archivo.name,
                        size: archivo.size
                    }
                });
            } else {
                socket.emit('send-message', {
                    ticketId: idTicket,
                    userId: userId,
                    contenido: nuevoMensaje.trim(),
                    isEmployee: userRole === 2,
                    archivo: null
                });
            }

            // Limpiar el formulario
            setNuevoMensaje('');
            setArchivo(null);
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) fileInput.value = '';
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
            alert('Error al enviar el mensaje');
        }
    };

    // Manejador del cambio de archivo
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 5 * 1024 * 1024) { // 5MB límite
            setArchivo(file);
        } else {
            alert('El archivo es demasiado grande. El tamaño máximo es 5MB.');
            e.target.value = '';
        }
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

            

            <div className={styles.mensajes}>
                {mensajes.map(mensaje => renderMensaje(mensaje))}
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
                        <div className={styles.archivoContainer}>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className={styles.inputArchivo}
                                id="archivo"
                            />
                            {archivo && (
                                <span className={styles.nombreArchivo}>
                                    📎 {archivo.name}
                                </span>
                            )}
                        </div>
                        <button type="submit" className={styles.botonEnviar}>
                            Enviar
                        </button>
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