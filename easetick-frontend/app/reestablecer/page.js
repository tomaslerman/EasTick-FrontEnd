"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import emailjs from '@emailjs/browser';
import styles from './page.module.css';

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Initialize emailjs
  emailjs.init("b2VM6uQ_kZRAzuO-6");

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendVerificationEmail = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.get(`http://localhost:5000/usuarios/byEmail/${email}`);
      
      if (!response.data) {
        setError("No existe una cuenta con este email");
        return;
      }

      const code = generateVerificationCode();
      setGeneratedCode(code);

      const templateParams = {
        to_email: email,
        verification_code: code,
      };

      await emailjs.send(
        'service_mwiy5pt',
        'template_f4sz8j6',
        templateParams
      );

      setMessage("Se ha enviado un código de verificación a tu email");
      setShowResetForm(true);
    } catch (error) {
      setError("Error al enviar el código de verificación");
      console.error(error);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");

    if (verificationCode !== generatedCode) {
      setError("Código de verificación incorrecto");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    if (!regex.test(newPassword)) {
      setError("La contraseña debe tener entre 8 y 16 caracteres, una mayúscula y un número");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/usuarios/reset-password`, {
        email,
        newPassword
      });

      setMessage("Contraseña actualizada correctamente");
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      setError("Error al actualizar la contraseña");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recuperar Contraseña</h1>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {message && <p className={styles.successMessage}>{message}</p>}
      
      {!showResetForm ? (
        <form onSubmit={sendVerificationEmail} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Ingrese su correo electrónico:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>
            Enviar código de verificación
          </button>
        </form>
      ) : (
        <form onSubmit={handlePasswordReset} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Código de verificación:</label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Nueva contraseña:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Confirmar contraseña:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>
            Reestablecer contraseña
          </button>
        </form>
      )}
    </div>
  );
}
