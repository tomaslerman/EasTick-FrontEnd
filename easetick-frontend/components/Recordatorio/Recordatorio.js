import { useState, useEffect, useContext } from "react";
import { TokenContext } from "@/context/TokenContext";
import styles from "./Recordatorio.module.css";

export default function Recordatorios() {
    const [recordatorios, setRecordatorios] = useState([]);
    const [nuevoRecordatorio, setNuevoRecordatorio] = useState("");
    const { userId } = useContext(TokenContext);

    // Cargar recordatorios al montar el componente
    useEffect(() => {
        const fetchRecordatorios = async () => {
            try {
                const response = await fetch(`http://localhost:5000/tickets/obtenerRecordatorios/${userId}`);
                const data = await response.json();
                if (data.success) {
                    setRecordatorios(data.message);
                }
            } catch (error) {
                console.error("Error al cargar recordatorios:", error);
            }
        };

        if (userId) {
            fetchRecordatorios();
        }
    }, [userId]);

    const agregarRecordatorio = async () => {
        if (nuevoRecordatorio.trim()) {
            try {
                const response = await fetch('http://localhost:5000/tickets/agregar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        texto: nuevoRecordatorio,
                        fkusuario: userId
                    })
                });

                const data = await response.json();
                
                if (data.success && data.recordatorio) {
                    // Agregar el nuevo recordatorio al estado usando el objeto devuelto por el backend
                    setRecordatorios(prevRecordatorios => [...prevRecordatorios, data.recordatorio]);
                    setNuevoRecordatorio("");
                } else {
                    console.error("No se recibió el recordatorio del servidor");
                }
            } catch (error) {
                console.error("Error al agregar recordatorio:", error);
            }
        }
    };

    const eliminarRecordatorio = async (recordatorioId) => {
        if (!recordatorioId) {
            console.error("ID de recordatorio no válido");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/tickets/eliminarRecordatorio/${recordatorioId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Actualizar el estado solo si la eliminación fue exitosa
                setRecordatorios(prevRecordatorios => 
                    prevRecordatorios.filter(rec => rec.id !== recordatorioId)
                );
            }
        } catch (error) {
            console.error("Error al eliminar recordatorio:", error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            agregarRecordatorio();
        }
    };

    return (
        <div className={styles.recordatoriosContainer}>
            <h2>Recordatorios</h2>
            <div className={styles.agregarRecordatorio}>
                <input
                    type="text"
                    placeholder="Añadir recordatorio"
                    value={nuevoRecordatorio}
                    onChange={(e) => setNuevoRecordatorio(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={agregarRecordatorio}>+</button>
            </div>
            <ul className={styles.listaRecordatorios}>
                {recordatorios.map((recordatorio) => (
                    <li key={recordatorio.id} className={styles.itemRecordatorio}>
                        <span>{recordatorio.texto}</span>
                        <button 
                            onClick={() => eliminarRecordatorio(recordatorio.id)}
                            className="boton-eliminar"
                        >
                            🗑️
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
