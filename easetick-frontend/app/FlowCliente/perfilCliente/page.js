'use client'
import { useEffect } from "react";
import useTitle from "@/hooks/useTitle";
import Titulo from "@/components/Titulo/Titulo";
import { ProtectedRoutes } from "@/app/utils/ProtectedRoutes";

export default function PerfilCliente() {
    const { setTitulo } = useTitle();
    
    useEffect(() => {
        setTitulo("Mi Perfil");
    }, [setTitulo]);

    return (
        <ProtectedRoutes allowedRoles={[1]}>
            <div>
                <Titulo titulo={"Mi Perfil"} subtitulo={"Gestione su información personal"} />
                {/* Aquí irá el contenido del perfil del cliente */}
            </div>
        </ProtectedRoutes>
    );
}
