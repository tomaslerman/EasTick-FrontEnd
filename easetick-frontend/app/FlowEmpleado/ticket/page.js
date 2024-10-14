'use client';

import { ProtectedRoutes } from "@/app/utils/ProtectedRoutes";
import useTitle from "@/hooks/useTitle";
import { useEffect } from "react";

export default function Ticket()
{
    const { setTitulo } = useTitle()

    useEffect(() => {
        setTitulo("Ticket")
    }, [])
    return(
        <ProtectedRoutes allowedRoles={[2]}>
            <div> 
            </div>
        </ProtectedRoutes>
    );
}