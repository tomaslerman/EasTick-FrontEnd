'use client'
import Titulo from "@/components/Titulo/Titulo";
import { useEffect } from "react";
import useTitle from "@/hooks/useTitle";

export default function estadistica() {
    const { setTitulo } = useTitle()

    useEffect(() => {
        setTitulo("Clientes")
    }, [])

  return (
    <div>
      <Titulo titulo={"Clientes"} subtitulo={"Crea y busque sus clientes"} />
    </div>
  );
}
