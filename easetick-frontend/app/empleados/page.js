'use client'
import Titulo from "@/components/Titulo/Titulo";
import { useEffect } from "react";
import useTitle from "@/hooks/useTitle";

export default function estadistica() {
    const { setTitulo } = useTitle()

    useEffect(() => {
        setTitulo("Empleados")
    }, [])

  return (
    <div>
      <Titulo titulo={"Empleados"} subtitulo={"Empleados PRESIS"} />
    </div>
  );
}
