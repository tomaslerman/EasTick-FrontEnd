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
      alert('Error al iniciar sesión');
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
    </div>
  );
}
