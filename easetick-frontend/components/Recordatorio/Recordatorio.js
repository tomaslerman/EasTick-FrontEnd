import { useState } from "react";
import styles from "./Recordatorio.module.css"; // Importa el archivo CSS correctamente

export default function Recordatorios() {
    const [recordatorios, setRecordatorios] = useState([]);
    const [nuevoRecordatorio, setNuevoRecordatorio] = useState("");

    const agregarRecordatorio = () => {
        if (nuevoRecordatorio.trim()) {
            setRecordatorios([...recordatorios, nuevoRecordatorio]);
            setNuevoRecordatorio("");
        }
    };
    const eliminarRecordatorio = (index) => {
        const nuevosRecordatorios = recordatorios.filter((_, i) => i !== index);
        setRecordatorios(nuevosRecordatorios);
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
                />
                <button onClick={agregarRecordatorio}>+</button>
            </div>
            <ul className={styles.listaRecordatorios}>
                {recordatorios.map((recordatorio, index) => (
                    <li key={index} className={styles.itemRecordatorio}>
                        <span>{recordatorio}</span>
                        <button 
              onClick={() => eliminarRecordatorio(index)}
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
