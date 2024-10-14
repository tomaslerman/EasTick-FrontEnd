'use client'
import Titulo from "@/components/Titulo/Titulo";
import { useEffect, useContext } from "react";
import useTitle from "@/hooks/useTitle";
import TituloClientes from "@/components/TituloClientes/TituloClientes";
import ListadoClientes from "@/components/ListadoClientes/ListadoClientes";
import { useTickets } from "@/hooks/useTickets";
import { ProtectedRoutes } from "../../utils/ProtectedRoutes";
import { TokenContext } from "@/context/TokenContext";
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
      <div>
          <Titulo titulo={"Clientes"} subtitulo={"Crea y busque sus clientes"} />
          <TituloClientes />
          <ListadoClientes clientes={clientesEmpresa} />
      </div>
    </ProtectedRoutes>
  );
}
