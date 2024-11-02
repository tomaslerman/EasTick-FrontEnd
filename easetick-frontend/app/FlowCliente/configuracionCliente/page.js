'use client';
import Titulo from "@/components/Titulo/Titulo";
import { useEffect } from "react";
import useTitle from "@/hooks/useTitle";
import Configuracion from "@/components/Configuracion/Configuracion";
import Boton from "@/components/Boton/Boton";
import { ProtectedRoutes } from "@/app/utils/ProtectedRoutes";

export default function configuracion() {
    const { setTitulo } = useTitle();

    useEffect(() => {
        setTitulo("Configuracion");
    }, []);

    return (
        <ProtectedRoutes allowedRoles={[1]}>
            <div>
                <Titulo titulo={"Tu configuracion"} subtitulo={"Administrá tu cuenta"} />
                <Configuracion />
                <Boton tipo="cerrarSesion" />
            </div>
        </ProtectedRoutes>
    );
}
