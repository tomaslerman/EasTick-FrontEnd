'use client'
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TokenContext } from '@/context/TokenContext';
import { ProtectedRoutes } from '@/app/utils/ProtectedRoutes';
import Titulo from '@/components/Titulo/Titulo';
import styles from './page.module.css';
import axios from 'axios';


export default function NuevoCliente() {
  const router = useRouter();
  const { idEmpresa } = useContext(TokenContext);
  const [tipoRegistro, setTipoRegistro] = useState('');
  const [empresas, setEmpresas] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    correoelectronico: '',
    contrasena: '',
    telefono: '',
    tipo: '',
    fkempresa: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/usuarios/empresas');
        setEmpresas(response.data.data);
      } catch (error) {
        setError('Error al cargar las empresas');
      }
    };

    if (tipoRegistro === 'cliente') {
      fetchEmpresas();
    }
  }, [tipoRegistro]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (tipoRegistro === 'cliente') {
        const response = await axios.post('http://localhost:5000/usuarios/crear-cliente', {
          nombre: formData.nombre,
          correoelectronico: formData.correoelectronico,
          contrasena: formData.contrasena,
          fkempresa: formData.fkempresa
        });
        if (response.data.success) {
          router.push('/FlowEmpleado/cliente');
        }
      } else {
        const response = await axios.post('http://localhost:5000/usuarios/empresas/crear', {
          nombre: formData.nombre,
          correoelectronico: formData.correoelectronico,
          telefono: formData.telefono,
          tipo: formData.tipo
        });
        if (response.data.success) {
          router.push('/FlowEmpleado/cliente');
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error al crear el registro.');
    }
  };

  const renderClienteForm = () => (
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
      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.submitButton}>Crear Cliente</button>
        <button type="button" onClick={() => router.back()} className={styles.cancelButton}>
          Cancelar
        </button>
      </div>
    </form>
  );

  const renderEmpresaForm = () => (
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
        <label>Teléfono</label>
        <input
          type="tel"
          value={formData.telefono}
          onChange={(e) => setFormData({...formData, telefono: e.target.value})}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label>Tipo</label>
        <input
          type="text"
          value={formData.tipo}
          onChange={(e) => setFormData({...formData, tipo: e.target.value})}
          required
        />
      </div>
      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.submitButton}>Crear Empresa</button>
        <button type="button" onClick={() => router.back()} className={styles.cancelButton}>
          Cancelar
        </button>
      </div>
    </form>
  );

  if (!tipoRegistro) {
    return (
      <ProtectedRoutes allowedRoles={[3]}>
        <div className={styles.container}>
          <Titulo titulo="Nuevo Registro" subtitulo="Seleccione el tipo de registro" />
          <div className={styles.selectionContainer}>
            <button onClick={() => setTipoRegistro('cliente')} className={styles.selectionButton}>
              Cliente Individual
            </button>
            <button onClick={() => setTipoRegistro('empresa')} className={styles.selectionButton}>
              Empresa
            </button>
          </div>
        </div>
      </ProtectedRoutes>
    );
  }

  return (
    <ProtectedRoutes allowedRoles={[3]}>
      <div className={styles.container}>
        <Titulo 
          titulo={tipoRegistro === 'cliente' ? "Nuevo Cliente" : "Nueva Empresa"} 
          subtitulo={`Ingrese los datos ${tipoRegistro === 'cliente' ? 'del nuevo cliente' : 'de la nueva empresa'}`} 
        />
        {error && <div className={styles.error}>{error}</div>}
        {tipoRegistro === 'cliente' ? renderClienteForm() : renderEmpresaForm()}
      </div>
    </ProtectedRoutes>
  );
} 