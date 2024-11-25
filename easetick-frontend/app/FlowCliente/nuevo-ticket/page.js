"use client";

import React, { useState, useContext } from "react";
import axios from "axios";
import { TokenContext } from "@/context/TokenContext";
import styles from "./page.module.css"; // Importar los estilos
import { ProtectedRoutes } from "@/app/utils/ProtectedRoutes";
import { useRouter } from "next/navigation"; // Importamos useRouter

const NuevoTicket = () => {
  const { userId, idEmpresa } = useContext(TokenContext); // Para obtener el idCliente del contexto
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipo, setTipo] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter(); // Inicializamos el router

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/tickets/crear", {
        asunto,
        mensaje,
        tipo,
        prioridad,
        idCliente: userId,
        idEmpresa: idEmpresa,
      });

      // Obtener el ID del ticket de la respuesta
      const nuevoTicketId = response.data.data.id;
      
      // Redirigir al usuario a la página del chat del nuevo ticket
      router.push(`/FlowCliente/ticket/${nuevoTicketId}`);
    } catch (error) {
      console.error("Error detallado:", error);
      setError("Error al crear el ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoutes allowedRoles={[1]}>
      <div className={styles.ticketContainer}>
        <h1 className={styles.title}>Crear Nuevo Ticket</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Asunto"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
            className={styles.input}
            required
          />
          <textarea
            placeholder="Mensaje"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            className={styles.textarea}
            required
          />
          <select
            name="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className={styles.select}
            required
          >
            <option value="">Selecciona el tipo de ticket</option>
            <option value="1">Pregunta</option>
            <option value="2">Incidente</option>
            <option value="3">Sugerencia</option>
            <option value="4">Mantenimiento</option>
            <option value="5">Reclamo</option>
          </select>
          <select
            name="prioridad"
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
            className={styles.select}
            required
          >
            <option value="">Selecciona la prioridad</option>
            <option value="1">Baja</option>
            <option value="2">Media</option>
            <option value="3">Alta</option>
            <option value="4">Urgente</option>
          </select>
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Creando..." : "Crear Ticket"}
          </button>
        </form>
      </div>
    </ProtectedRoutes>
  );
};

export default NuevoTicket;
