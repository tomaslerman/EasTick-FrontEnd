'use client'
import Titulo from "@/components/Titulo/Titulo";
import ListadoEmpleados from "@/components/ListadoEmpleados/ListadoEmpleados";
import { useEffect, useContext } from "react";
import useTitle from "@/hooks/useTitle";
import { useTickets } from "@/hooks/useTickets";
import { ProtectedRoutes } from "@/app/utils/ProtectedRoutes";
import { TokenContext } from "@/context/TokenContext";
import styles from './page.module.css';

export default function Empleados() {
    const { userId, loading } = useContext(TokenContext);
    const { setTitulo } = useTitle()
    const {empleadosEmpresa } = useTickets({ id: userId || ''});
    
    useEffect(() => {
        setTitulo("Empleados")
    }, [])
    
    if (loading) return;
    
    return (
      <ProtectedRoutes allowedRoles={[2]}>
        <div className={styles.container}>
          <Titulo titulo={"Empleados"} subtitulo={"Empleados PRESIS"} />
          <div className={styles.listadoWrapper}>
            <ListadoEmpleados empleados={empleadosEmpresa} />
          </div>
        </div>
      </ProtectedRoutes>
    );
}
