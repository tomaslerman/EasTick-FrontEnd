'use client'
import Titulo from "@/components/Titulo/Titulo";
import { useEffect } from "react";
import useTitle from "@/hooks/useTitle";
import TituloClientes from "@/components/TituloClientes/TituloClientes";
import ListadoClientes from "@/components/ListadoClientes/ListadoClientes";

export default function Clientes() {
    const { setTitulo } = useTitle()

    useEffect(() => {
        setTitulo("Clientes")
    }, [])

    const clientes = [
      { nombre: 'Anna Murray', tipo: 'Logistica', ultimoTicket: 'Hace 2 horas' },
      { nombre: 'John Doe', tipo: 'Finanzas', ultimoTicket: 'Hace 3 horas' },
      { nombre: 'Jane Smith', tipo: 'Ventas', ultimoTicket: 'Hace 1 hora' }
  ];

  return (
      <div>
          <Titulo titulo={"Clientes"} subtitulo={"Crea y busque sus clientes"} />
          <TituloClientes />
          <ListadoClientes clientes={clientes} />
      </div>
  );
}
