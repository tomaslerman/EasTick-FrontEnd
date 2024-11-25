import React, { useState, useEffect, useContext, useRef } from 'react';
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
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const fileInputRef = useRef(null);
    const [puedeCalificar, setPuedeCalificar] = useState(false);

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
        
        const formatearFecha = (fecha) => {
            const fechaObj = new Date(fecha);
            return fechaObj.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        };

        return (
            <div key={mensaje.id} className={`${styles.mensaje} ${esUsuarioActual ? styles.mensajePropio : styles.mensajeOtro}`}>
                <div className={styles.mensajeHeader}>
                    <span className={styles.usuario}>{nombreUsuario}</span>
                    <span className={styles.separador}>•</span>
                    <span className={styles.fecha}>
                        {formatearFecha(mensaje.fechacreacion)}
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
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setArchivo(file);
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
        if (userRole !== 2) {
            alert('Solo los empleados pueden cerrar tickets');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/tickets/${idTicket}/cerrar`);
            
            if (response.data.success) {
                setTicketCerrado(true);
                // Emitir evento de cierre a través del socket
                socket.emit('ticket-closed', {
                    ticketId: idTicket,
                    mensaje: 'El ticket ha sido cerrado por un empleado'
                });
                setMostrarConfirmacion(false);
            }
        } catch (error) {
            console.error('Error al cerrar ticket:', error);
            alert('Error al cerrar el ticket. Por favor, intente nuevamente.');
        }
    };

    // Agregar este efecto para escuchar el evento de cierre
    useEffect(() => {
        if (socket) {
            socket.on('ticket-closed-notification', (data) => {
                setTicketCerrado(true);
                alert(data.mensaje || 'Este ticket ha sido cerrado');
                // Esperar un momento antes de recargar para que el usuario vea el mensaje
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            });

            return () => {
                socket.off('ticket-closed-notification');
            };
        }
    }, [socket]);

    useEffect(() => {
        const verificarCalificacion = async () => {
            if (estadoTicket === 2 && userRole === 1) { // 2 = ticket cerrado
                try {
                    const response = await axios.get(`http://localhost:5000/tickets/${idTicket}/verificarCalificacion`);
                    setPuedeCalificar(!response.data.yaCalificado);
                    setCalificacionEnviada(response.data.yaCalificado);
                } catch (error) {
                    console.error('Error al verificar calificación:', error);
                    setPuedeCalificar(false);
                }
            }
        };
        verificarCalificacion();
    }, [idTicket, estadoTicket, userRole]);

    const handleCalificacionClick = (valor) => {
        setCalificacion(valor);
    };

    const enviarCalificacion = async () => {
        try {
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
                setPuedeCalificar(false);
                // Mostrar mensaje de éxito y recargar después de un breve delay
                alert('¡Gracias por tu calificación!');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            console.error('Error al enviar calificación:', error);
            alert(error.response?.data?.error || 'Error al enviar la calificación');
        }
    };

    // Render rating component if ticket is closed and user is client
    const renderCalificacion = () => {
        if (calificacionEnviada) {
            return (
                <div className={styles.calificacionEnviadaContainer}>
                    <h3>¡Gracias por tu calificación!</h3>
                    <p>Ya has calificado este ticket.</p>
                </div>
            );
        }

        if (!puedeCalificar) return null;

        return (
            <div className={styles.calificacionContainer}>
                <h3>Califica este ticket</h3>
                <div className={styles.estrellas}>
                    {[1, 2, 3, 4, 5].map((valor) => (
                        <span
                            key={valor}
                            onClick={() => handleCalificacionClick(valor)}
                            className={`${styles.estrella} ${
                                valor <= calificacion ? styles.estrellaActiva : ''
                            }`}
                        >
                            ★
                        </span>
                    ))}
                </div>
                {calificacion > 0 && (
                    <button 
                        onClick={enviarCalificacion}
                        className={styles.botonCalificar}
                    >
                        Enviar Calificación
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.headerActions}>
                <div className={styles.headerInfo}>
                    <h2>{asunto}</h2>
                    <div className={styles.infoTicket}>
                        <span>Prioridad: {prioridad}</span>
                        <span>Tipo: {tipo}</span>
                    </div>
                </div>
                {userRole === 2 && !ticketCerrado && (
                    <button 
                        className={styles.botonCerrar}
                        onClick={() => setMostrarConfirmacion(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cerrar Chat
                    </button>
                )}
            </div>

            <div className={styles.mensajes}>
                {mensajes.map(mensaje => renderMensaje(mensaje))}
            </div>

            {!ticketCerrado ? (
                <form onSubmit={enviarMensaje} className={styles.formulario}>
                    <input
                        type="text"
                        value={nuevoMensaje}
                        onChange={(e) => setNuevoMensaje(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className={styles.input}
                    />
                    <input
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className={styles.botonArchivo}
                    >
                        📎
                    </button>
                    <button type="submit" className={styles.botonEnviar}>
                        Enviar
                    </button>
                </form>
            ) : (
                <div className={styles.ticketCerradoMensaje}>
                    Este ticket está cerrado y no se pueden enviar más mensajes
                </div>
            )}

            {/* Modal de confirmación */}
            {mostrarConfirmacion && (
                <>
                    <div className={styles.overlay} onClick={() => setMostrarConfirmacion(false)} />
                    <div className={styles.confirmacionCierre}>
                        <h3>¿Cerrar este chat?</h3>
                        <p>Esta acción no se puede deshacer. ¿Estás seguro de que deseas cerrar este chat?</p>
                        <div className={styles.confirmacionBotones}>
                            <button 
                                className={styles.cancelarCierre}
                                onClick={() => setMostrarConfirmacion(false)}
                            >
                                Cancelar
                            </button>
                            <button 
                                className={styles.confirmarCierre}
                                onClick={() => {
                                    cerrarTicket();
                                    setMostrarConfirmacion(false);
                                }}
                            >
                                Cerrar Chat
                            </button>
                        </div>
                    </div>
                </>
            )}
            {renderCalificacion()}
        </div>
    );
};

export default Chat;