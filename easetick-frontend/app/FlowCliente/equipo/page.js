'use client'
import { useEffect } from "react";
import useTitle from "@/hooks/useTitle";
import Titulo from "@/components/Titulo/Titulo";
import { ProtectedRoutes } from "@/app/utils/ProtectedRoutes";

export default function Equipo() {
    const { setTitulo } = useTitle();
    
    useEffect(() => {
        setTitulo("Mi Equipo");
    }, [setTitulo]);

    return (
        <ProtectedRoutes allowedRoles={[1]}>
            <div>
                <Titulo titulo={"Mi Equipo"} subtitulo={"Gestione su equipo de trabajo"} />
                {/* Aquí irá el contenido específico de la página de equipo */}
            </div>
        </ProtectedRoutes>
    );
}
