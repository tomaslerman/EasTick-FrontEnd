'use client'
import { useEffect } from "react";
import useTitle from "@/hooks/useTitle";
import Titulo from "@/components/Titulo/Titulo";
import { ProtectedRoutes } from "@/app/utils/ProtectedRoutes";

export default function EstadisticasCliente() {
    const { setTitulo } = useTitle();
    
    useEffect(() => {
        setTitulo("Mis Estadísticas");
    }, [setTitulo]);

    return (
        <ProtectedRoutes allowedRoles={[1]}>
            <div>
                <Titulo titulo={"Mis Estadísticas"} subtitulo={"Revise sus métricas"} />
                {/* Aquí irán los componentes de gráficos y estadísticas */}
            </div>
        </ProtectedRoutes>
    );
}
