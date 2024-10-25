'use client'
import { useEffect } from "react";
import useTitle from "@/hooks/useTitle";
import Titulo from "@/components/Titulo/Titulo";
import Configuracion from "@/components/Configuracion/Configuracion";
import Boton from "@/components/Boton/Boton";
import { ProtectedRoutes } from "@/app/utils/ProtectedRoutes";

export default function ConfiguracionCliente() {
    const { setTitulo } = useTitle();

    useEffect(() => {
        setTitulo("Configuración");
    }, [setTitulo]);

    return (
        <ProtectedRoutes allowedRoles={[1]}>
            <div>
                <Titulo titulo={"Tu configuración"} subtitulo={"Administra tu cuenta"} />
                <Configuracion />
                <Boton tipo="cerrarSesion" />
            </div>
        </ProtectedRoutes>
    );
}
