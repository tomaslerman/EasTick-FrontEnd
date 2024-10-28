'use client';
import { ProtectedRoutes } from "@/app/utils/ProtectedRoutes";
import HelpCenter from "@/components/HelpCenter/HelpCenter";
import ButtonContainer from "@/components/ButtonContainer/ButtonContainer";
import Titulo from "@/components/Titulo/Titulo";
import useTitle from "@/hooks/useTitle";
import { useEffect } from "react";

export default function Home() {
    const { setTitulo } = useTitle();
    
    useEffect(() => {
        setTitulo("Home");
    }, [setTitulo]);

    return (
        <ProtectedRoutes allowedRoles={[1]}> 
            <Titulo titulo={"Centro de ayuda"} />
            <ButtonContainer/>
            <HelpCenter />
        </ProtectedRoutes>
    );
}