'use client';
import { ProtectedRoutes } from "@/app/utils/ProtectedRoutes";
import HelpCenter from "@/components/HelpCenter/HelpCenter";
import ButtonContainer from "@/components/ButtonContainer/ButtonContainer";
import Titulo from "@/components/Titulo/Titulo";
export default function Home() {
    return (
        <ProtectedRoutes allowedRoles={[1]}> 
            <Titulo titulo={"Centro de ayuda"} />
            <ButtonContainer/>
            <HelpCenter />
        </ProtectedRoutes>
    );
}