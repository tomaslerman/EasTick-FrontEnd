// utils/ProtectedRoutes.js
'use client';

import { TokenContext } from "@/context/TokenContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export const ProtectedRoutes = ({ children }) => {
  const router = useRouter();
  const { isLoggedIn, loading } = useContext(TokenContext);

  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn && router.pathname !== "/login") {
        router.push("/"); // Redirige al login si no está logueado
      } else if (isLoggedIn && router.pathname === "/login") {
        router.push('/'); // Si está logueado y recarga en la página de login, lo manda al index
      }
    }
  }, [isLoggedIn, loading, router]);


  // Evitar que se muestre el layout si no está logueado
  return isLoggedIn ? children : null;
};
