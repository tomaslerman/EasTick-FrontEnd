'use client'
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TokenContext } from '@/context/TokenContext';
import { ProtectedRoutes } from '@/app/utils/ProtectedRoutes';
import Titulo from '@/components/Titulo/Titulo';
import styles from './page.module.css';
import axios from 'axios';

export default function NuevoEmpleado() {
  const router = useRouter();
  const { idEmpresa } = useContext(TokenContext);
  const [empresas, setEmpresas] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    correoelectronico: '',
    contrasena: '',
    fkempresa: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/usuarios/empresas-no-clientes');
        setEmpresas(response.data.data);
      } catch (error) {
        setError('Error al cargar las empresas');
      }
    };

    fetchEmpresas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/usuarios/crear-empleado', {
        ...formData,
        fkempresa: formData.fkempresa
      });

      if (response.data.success) {
        router.push('/FlowEmpleado/empleados');
      }
    } catch (error) {
      setError(
        error.response?.data?.message || 
        'Error al crear el empleado. Por favor, intente nuevamente.'
      );
    }
  };

  return (
    <ProtectedRoutes allowedRoles={[3]}>
      <div className={styles.container}>
        <Titulo titulo="Nuevo Empleado" subtitulo="Ingrese los datos del nuevo empleado" />
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Nombre</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Correo Electrónico</label>
            <input
              type="email"
              value={formData.correoelectronico}
              onChange={(e) => setFormData({...formData, correoelectronico: e.target.value})}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Contraseña</label>
            <input
              type="password"
              value={formData.contrasena}
              onChange={(e) => setFormData({...formData, contrasena: e.target.value})}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Empresa</label>
            <select
              value={formData.fkempresa}
              onChange={(e) => setFormData({...formData, fkempresa: e.target.value})}
              required
            >
              <option value="">Seleccione una empresa</option>
              {empresas.map((empresa) => (
                <option key={empresa.id} value={empresa.id}>
                  {empresa.nombre}
                </option>
              ))}
            </select>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              Crear Empleado
            </button>
            <button 
              type="button" 
              onClick={() => router.back()} 
              className={styles.cancelButton}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </ProtectedRoutes>
  );
} 