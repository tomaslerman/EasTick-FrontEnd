'use client';
import { ProtectedRoutes } from "@/app/utils/ProtectedRoutes";
export default function Home()
{
   
    return(
        <ProtectedRoutes allowedRoles={[1]}> 
            <h1>home</h1>
        </ProtectedRoutes>
    );
}