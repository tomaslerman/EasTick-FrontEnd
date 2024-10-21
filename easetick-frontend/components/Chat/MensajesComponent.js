import React from 'react';
import styles from './Chat.module.css';

const MensajesComponent = ({ mensajes }) => {
    return (
        <div className={styles.mensajes}>
            {mensajes.map((mensaje, index) => (
                <div key={index} className={styles.mensaje}>
                    <strong>{mensaje.fkCliente ? mensaje.fkCliente.nombre : mensaje.fkEmpleado.nombre}:</strong>
                    <p>{mensaje.contenido}</p>
                </div>
            ))}
        </div>
    );
};

export default MensajesComponent;
