'use client'
import Titulo from "@/components/Titulo/Titulo";
import TituloEmpleados from "@/components/TituloEmpleados/TituloEmpleados";
import ListadoEmpleados from "@/components/ListadoEmpleados/ListadoEmpleados";
import { useEffect } from "react";
import useTitle from "@/hooks/useTitle";

export default function Empleados() {
    const { setTitulo } = useTitle()

    useEffect(() => {
        setTitulo("Empleados")
    }, [])

    const empleados = [
      { name: 'Sarah Gray', email: 'SarahGray@gmail.com', rating: '4/5', tickets: 3 },
      { name: 'John Doe', email: 'JohnDoe@gmail.com', rating: '5/5', tickets: 5 },
    ];

  return (
    <div>
      <Titulo titulo={"Empleados"} subtitulo={"Empleados PRESIS"} />
      <TituloEmpleados />
      <ListadoEmpleados empleados={empleados} />
    </div>
  );
}
