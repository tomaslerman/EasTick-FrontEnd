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
    const {empleadosEmpresa } = useTickets({ id: userId || ''});
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      setTitulo("Empleados")
      
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 6000);
      
      return () => clearTimeout(timer);
    }, [])
    
    if (loading) return;
    
    return (
      <ProtectedRoutes allowedRoles={[2]}>
        <div className={styles.container}>
          <Titulo titulo={"Empleados"} subtitulo={"Empleados PRESIS"} />
          <div className={styles.listadoWrapper}>
            {isLoading ? (
              <div>Cargando empleados...</div>
            ) : empleadosEmpresa && empleadosEmpresa.length > 0 ? (
              <ListadoEmpleados empleados={empleadosEmpresa} />
            ) : (
              <div>No hay empleados disponibles</div>
            )}
          </div>
        </div>
      </ProtectedRoutes>
    );
}
