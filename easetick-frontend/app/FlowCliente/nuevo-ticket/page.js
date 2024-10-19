'use client';

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from '@/context/TokenContext';

const NuevoTicket = () => {
  const { userId } = useContext(TokenContext);  // Para obtener el idCliente del contexto
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipo, setTipo] = useState('');
  const [prioridad, setPrioridad] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Obtener idEmpresa desde el token o asignar un valor por defecto
  const idEmpresa = 1;  // Este valor deberías obtenerlo o de tu contexto o fijarlo por ahora

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Hacer solicitud al backend para crear el ticket
      const response = await axios.post('http://localhost:5000/tickets/crear', {
        asunto,
        mensaje,
        tipo,
        prioridad,
        idCliente: userId,
        idEmpresa: idEmpresa
      });

      setSuccess('Ticket creado con éxito');
      setAsunto('');
      setMensaje('');
      setTipo('');
      setPrioridad('');
    } catch (error) {
      setError('Error al crear el ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Crear Nuevo Ticket</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
  <input
    type="text"
    placeholder="Asunto"
    value={asunto}
    onChange={(e) => setAsunto(e.target.value)}
  />
  
  <textarea
    placeholder="Mensaje"
    value={mensaje}
    onChange={(e) => setMensaje(e.target.value)}
  />

  <select name="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
    <option value="1">Pregunta</option>
    <option value="2">Incidente</option>
    
  </select>

  <select name="prioridad" value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
    <option value="1">Baja</option>
    <option value="2">Media</option>
    <option value="3">Alta</option>
    <option value="4">Urgente</option>
  </select>

  <button type="submit">Crear Ticket</button>
</form>

    </div>
  );
};

export default NuevoTicket;
