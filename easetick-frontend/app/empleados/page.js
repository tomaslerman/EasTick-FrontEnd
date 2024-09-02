'use client'
import Titulo from "@/components/Titulo/Titulo";
import TituloEmpleados from "@/components/TituloEmpleados/TituloEmpleados";
import ListadoEmpleados from "@/components/ListadoEmpleados/ListadoEmpleados";
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
      <TituloEmpleados/>
      <ListadoEmpleados/>
    </div>
  );
}
