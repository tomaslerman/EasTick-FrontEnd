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

    // Inicializar socket
    useEffect(() => {
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    // Unirse al chat y cargar mensajes
    useEffect(() => {
        if (!socket) return;

        socket.emit('join-chat', idTicket);

        const cargarMensajes = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/tickets/${idTicket}/mensajes`);
                if (response.data.success) {
                    setMensajes(response.data.mensajes);
                }
            } catch (error) {
                console.error('Error al cargar mensajes:', error);
            }
        };
        cargarMensajes();

        socket.on('new-message', (data) => {
            console.log('Nuevo mensaje recibido:', data);
            if (data.message) {
                setMensajes(prev => [...prev, data.message]);
            }
        });

        return () => {
            socket.off('new-message');
        };
    }, [socket, idTicket]);

    const renderMensaje = (mensaje) => {
        const esUsuarioActual = 
            (userRole === 2 && mensaje.fkEmpleado !== null) || 
            (userRole === 1 && mensaje.fkCliente !== null);
        
        let nombre = 'Usuario Desconocido';
        if (mensaje.fkEmpleado && mensaje.fkEmpleado.nombre) {
            nombre = mensaje.fkEmpleado.nombre;
        } else if (mensaje.fkCliente && mensaje.fkCliente.nombre) {
            nombre = mensaje.fkCliente.nombre;
        }
        
        return (
            <div key={mensaje.id} className={`${styles.mensaje} ${esUsuarioActual ? styles.mensajeCliente : styles.mensajeEmpleado}`}>
                <div className={styles.mensajeHeader}>
                    <span className={styles.nombre}>{nombre}</span>
                    <span className={styles.fecha}>
                        {new Date(mensaje.fechacreacion).toLocaleString()}
                    </span>
                </div>
                <div className={styles.mensajeContenido}>
                    {mensaje.contenido && (
                        <div className={styles.texto}>{mensaje.contenido}</div>
                    )}
                    {mensaje.archivo_url && (
                        <div className={styles.archivo}>
                            <a 
                                href={mensaje.archivo_url}
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={styles.archivoLink}
                                download={mensaje.archivo_nombre}
                            >
                                {mensaje.archivo_nombre?.match(/\.(jpg|jpeg|png|gif)$/i) ? '🖼️' : '📎'}
                                <span className={styles.nombreArchivo}>
                                    {mensaje.archivo_nombre}
                                </span>
                                <span className={styles.descargarTexto}>Descargar</span>
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

        const formData = new FormData();
        
        // Agregar los campos al FormData solo si tienen valor
        if (nuevoMensaje.trim()) {
            formData.append('contenido', nuevoMensaje.trim());
        }
        
        // Asegurarse de que userId es un número
        formData.append('userId', String(userId));
        
        // Convertir el booleano a string
        formData.append('isEmployee', String(userRole === 2));
        
        if (archivo) {
            formData.append('archivo', archivo);
        }

        try {
            console.log('Enviando mensaje:', {
                contenido: nuevoMensaje,
                userId: userId,
                isEmployee: userRole === 2,
                archivo: archivo
            });

            const response = await axios.post(
                `http://localhost:5000/tickets/${idTicket}/mensaje`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data.success) {
                // Emitir el mensaje a través del socket
                socket.emit('new-message', {
                    ticketId: idTicket,
                    message: response.data.mensaje
                });
                
                // Limpiar el formulario
                setNuevoMensaje('');
                setArchivo(null);
                
                // Limpiar el input de archivo
                const fileInput = document.querySelector('input[type="file"]');
                if (fileInput) fileInput.value = '';
                
                // Opcional: Actualizar los mensajes localmente
                setMensajes(prev => [...prev, response.data.mensaje]);
            }
        } catch (error) {
            console.error('Error completo al enviar mensaje:', error);
            console.error('Detalles del error:', error.response?.data);
            alert('Error al enviar el mensaje');
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
                                onChange={(e) => setArchivo(e.target.files[0])}
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