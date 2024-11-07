'use client';
import { useState } from 'react';
import styles from './FiltroTickets.module.css';

const FiltroTickets = ({ onFilterChange }) => {
    const [estado, setEstado] = useState('todos');
    const [prioridad, setPrioridad] = useState('todos');

    const handleEstadoChange = (e) => {
        const nuevoEstado = e.target.value;
        setEstado(nuevoEstado);
        console.log('Nuevo estado seleccionado:', nuevoEstado);
        onFilterChange({
            estado: nuevoEstado,
            prioridad: prioridad
        });
    };

    const handlePrioridadChange = (e) => {
        const nuevaPrioridad = e.target.value;
        setPrioridad(nuevaPrioridad);
        onFilterChange({
            estado: estado,
            prioridad: nuevaPrioridad
        });
    };

    return (
        <div className={styles.filtroContainer}>
            <div className={styles.filtroGroup}>
                <label>Estado:</label>
                <select value={estado} onChange={handleEstadoChange}>
                    <option value="todos">Todos</option>
                    <option value="Abierto">Abierto</option>
                    <option value="Cerrado">Cerrado</option>
                    <option value="Esperando respuesta de empleado">Esperando respuesta del empleado</option>
                </select>
            </div>
            <div className={styles.filtroGroup}>
                <label>Prioridad:</label>
                <select value={prioridad} onChange={handlePrioridadChange}>
                    <option value="todos">Todas</option>
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                    <option value="Urgente">Urgente</option>
                </select>
            </div>
        </div>
    );
};

export default FiltroTickets; 