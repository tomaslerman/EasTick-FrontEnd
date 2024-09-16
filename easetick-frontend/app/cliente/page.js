'use client'
import Titulo from "@/components/Titulo/Titulo";
import { useEffect } from "react";
import useTitle from "@/hooks/useTitle";
import TituloClientes from "@/components/TituloClientes/TituloClientes";
import ListadoClientes from "@/components/ListadoClientes/ListadoClientes";
import { useTickets } from "@/hooks/useTickets";
export default function Clientes() {
   
    const { setTitulo } = useTitle()
    const {clientesEmpresa } = useTickets({ id: 2 });
    useEffect(() => {
        setTitulo("Clientes")
    }, [])
  return (
      <div>
          <Titulo titulo={"Clientes"} subtitulo={"Crea y busque sus clientes"} />
          <TituloClientes />
          <ListadoClientes clientes={clientesEmpresa} />
      </div>
  );
}
