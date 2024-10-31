'use client'
import Titulo from "@/components/Titulo/Titulo";
import { useEffect, useContext } from "react";
import useTitle from "@/hooks/useTitle";
import TituloClientes from "@/components/TituloClientes/TituloClientes";
import ListadoClientes from "@/components/ListadoClientes/ListadoClientes";
import { useTickets } from "@/hooks/useTickets";
import { ProtectedRoutes } from "../../utils/ProtectedRoutes";
import { TokenContext } from "@/context/TokenContext";
import styles from './page.module.css';

export default function Clientes() {
  const { userId, loading } = useContext(TokenContext);
    const { setTitulo } = useTitle()
    const {clientesEmpresa } = useTickets({ id: userId || ''});
    useEffect(() => {
        setTitulo("Clientes")
    }, [])
    if (loading) return;
  return (
    <ProtectedRoutes allowedRoles={[2]}>
      <div className={styles.container}>
        <Titulo titulo={"Clientes"} subtitulo={"Crea y busque sus clientes"} />
        <div className={styles.listadoWrapper}>
          <TituloClientes />
          <ListadoClientes clientes={clientesEmpresa} />
        </div>
      </div>
    </ProtectedRoutes>
  );
}
