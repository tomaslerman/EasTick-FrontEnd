'use client'
import Titulo from "@/components/Titulo/Titulo";
import { useEffect, useContext, useState } from "react";
import useTitle from "@/hooks/useTitle";
import ListadoClientes from "@/components/ListadoClientes/ListadoClientes";
import { useTickets } from "@/hooks/useTickets";
import { ProtectedRoutes } from "../../utils/ProtectedRoutes";
import { TokenContext } from "@/context/TokenContext";
import styles from './page.module.css';
import Link from "next/link";


export default function Clientes() {
  const { userId, loading, userRole } = useContext(TokenContext);
  const { setTitulo } = useTitle()
  const { clientesEmpresa } = useTickets({ id: userId || '' });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setTitulo("Clientes")
    if (clientesEmpresa) {
      setIsLoading(false);
    }
  }, [clientesEmpresa, setTitulo])
  
  if (loading) return null;
  
  return (
    <ProtectedRoutes allowedRoles={[2, 3]}>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <Titulo titulo={"Clientes"} subtitulo={"Crea y busque sus clientes"} />
          {userRole === 3 && (
            <Link href="/FlowEmpleado/cliente/nuevo" className={styles.addButton}>
              <button className={styles.button}>
                Agregar Cliente
              </button>
            </Link>
          )}
        </div>
        <div className={styles.listadoWrapper}>
          {isLoading ? (
            <div className={styles.loaderContainer}>
              <div className={styles.loader}></div>
              <span className={styles.loaderText}>Cargando clientes...</span>
            </div>
          ) : clientesEmpresa && clientesEmpresa.length > 0 ? (
            <ListadoClientes clientes={clientesEmpresa} />
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <p>No hay clientes disponibles</p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoutes>
  );
}
