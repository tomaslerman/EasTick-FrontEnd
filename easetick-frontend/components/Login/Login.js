// src/components/Login.js
'use client';

import { useContext, useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { TokenContext } from "@/context/TokenContext";

export default function Login() {
  const { saveToken } = useContext(TokenContext);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para manejar errores
  const router = useRouter();

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        correoelectronico: user,
        password: pass
      });
      saveToken(response.data.token);
      router.push('/estadistica'); // Redirigir al dashboard después del login
    } catch (error) {
      console.error("Error en login:", error);
      setErrorMessage('Datos incorrectos'); // Cambia el estado para mostrar el mensaje de error
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Ingrese su usuario" 
        value={user}
        onChange={e => setUser(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Ingrese su contraseña"
        value={pass}
        onChange={e => setPass(e.target.value)} 
      />
      <button onClick={login}>Login</button>

      {errorMessage && <h2 style={{ color: 'red' }}>{errorMessage}</h2>} {/* Mostrar el error en rojo */}
    </div>
  );
}
