'use client'
import Titulo from "@/components/Titulo/Titulo";
import TituloEmpleados from "@/components/TituloEmpleados/TituloEmpleados";
import ListadoEmpleados from "@/components/ListadoEmpleados/ListadoEmpleados";
import { useEffect, useContext } from "react";
import useTitle from "@/hooks/useTitle";
import { useTickets } from "@/hooks/useTickets";
import { ProtectedRoutes } from "@/app/utils/ProtectedRoutes";
import { TokenContext } from "@/context/TokenContext";
export default function Empleados() {
    const { userId, loading } = useContext(TokenContext);
    const { setTitulo } = useTitle()
    const {empleadosEmpresa } = useTickets({ id: userId || ''});
    useEffect(() => {
        setTitulo("Empleados")
    }, [])
    if (loading) return;
  return (
    <ProtectedRoutes allowedRoles={[2]}>
      <div>
        <Titulo titulo={"Empleados"} subtitulo={"Empleados PRESIS"} />
        <TituloEmpleados />
        <ListadoEmpleados empleados={empleadosEmpresa} />
      </div>
    </ProtectedRoutes>
  );
}
