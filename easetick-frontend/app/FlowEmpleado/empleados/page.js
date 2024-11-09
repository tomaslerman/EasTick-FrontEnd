'use client'
import Titulo from "@/components/Titulo/Titulo";
import ListadoEmpleados from "@/components/ListadoEmpleados/ListadoEmpleados";
import { useEffect, useContext, useState } from "react";
import useTitle from "@/hooks/useTitle";
import { useTickets } from "@/hooks/useTickets";
import { ProtectedRoutes } from "@/app/utils/ProtectedRoutes";
import { TokenContext } from "@/context/TokenContext";
import styles from './page.module.css';

export default function Empleados() {
    const { userId, loading } = useContext(TokenContext);
    const { setTitulo } = useTitle()
    const { empleadosEmpresa } = useTickets({ id: userId || '' });
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      setTitulo("Empleados")
      
      if (empleadosEmpresa) {
        setIsLoading(false);
      }
    }, [empleadosEmpresa, setTitulo])
    
    if (loading) return null;
    
    return (
      <ProtectedRoutes allowedRoles={[2]}>
        <div className={styles.container}>
          <Titulo titulo={"Empleados"} subtitulo={"Gestiona tu equipo de trabajo"} />
          <div className={styles.listadoWrapper}>
            {isLoading ? (
              <div className={styles.loaderContainer}>
                <div className={styles.loader}></div>
                <span className={styles.loaderText}>Cargando empleados...</span>
              </div>
            ) : empleadosEmpresa && empleadosEmpresa.length > 0 ? (
              <ListadoEmpleados empleados={empleadosEmpresa} />
            ) : (
              <div className={styles.emptyState}>
                <svg 
                  width="64" 
                  height="64" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#64748b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <p>No hay empleados disponibles</p>
              </div>
            )}
          </div>
        </div>
      </ProtectedRoutes>
    );
}
