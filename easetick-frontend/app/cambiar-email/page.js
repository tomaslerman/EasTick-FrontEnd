 "use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from './page.module.css';
import { TokenContext } from '@/context/TokenContext';

export default function CambiarEmail() {
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { token, clearToken } = useContext(TokenContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newEmail !== confirmEmail) {
      setError("Los correos electrónicos no coinciden");
      return;
    }

    try {
      const response = await axios.put('http://localhost:5000/usuarios/cambiar-email', {
        email: currentEmail,
        nuevoEmail: newEmail
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setMessage("Email actualizado correctamente. Por favor, inicia sesión nuevamente.");
        setTimeout(() => {
          clearToken();
          router.push('/');
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error al actualizar el email");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cambiar Email</h1>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {message && <p className={styles.successMessage}>{message}</p>}
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Email actual:</label>
          <input
            type="email"
            value={currentEmail}
            onChange={(e) => setCurrentEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Nuevo email:</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Confirmar nuevo email:</label>
          <input
            type="email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Actualizar Email
        </button>
      </form>
    </div>
  );
}