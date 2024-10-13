'use client';
import { ProtectedRoutes } from "@/app/utils/ProtectedRoutes";
export default function Home()
{
   
    return(
        <ProtectedRoutes> 
            <h1>home</h1>
        </ProtectedRoutes>
    );
}