import { useContext, useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { TokenContext } from "@/context/TokenContext";
import styles from './Login.module.css';

export default function Login() {
  const { saveToken } = useContext(TokenContext);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        correoelectronico: user,
        password: pass
      });
      saveToken(response.data.token);
      router.push('/');
    } catch (error) {
      setErrorMessage('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <form onSubmit={login} className={styles.form}>
      <div className={styles.inputGroup}>
        <input 
          type="email" 
          placeholder="Correo electrónico" 
          value={user}
          onChange={e => setUser(e.target.value)} 
          className={styles.input}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <input 
          type="password" 
          placeholder="Contraseña"
          value={pass}
          onChange={e => setPass(e.target.value)} 
          className={styles.input}
          required
        />
      </div>
      <button type="submit" className={styles.loginButton}>Iniciar Sesión</button>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </form>
  );
}