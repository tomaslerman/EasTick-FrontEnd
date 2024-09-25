'use client'
import Titulo from "@/components/Titulo/Titulo";
import { useEffect } from "react";
import useTitle from "@/hooks/useTitle";
import Configuracion from "@/components/Configuracion/Configuracion";
import { logout } from "../logout/actions";
import DemoClientComponent from "@/components/DemoClientComponent";
export default function configuracion() {
    const { setTitulo } = useTitle()

    useEffect(() => {
        setTitulo("Configuracion")
    }, [])

  return (
    <div>
      <Titulo titulo={"Tu configuracion"} subtitulo={"Administrá tu cuenta"} />
      <Configuracion/>
      
    </div>

  );
}
