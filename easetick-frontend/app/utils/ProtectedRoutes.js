'use client';

import { TokenContext } from "@/context/TokenContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export const ProtectedRoutes = ({ children }) => {
  const router = useRouter();
  const { isLoggedIn } = useContext(TokenContext);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login"); // Redirigir si no está logueado
    }
  }, [isLoggedIn, router]);

  

  return isLoggedIn ? children : null; // Si está logueado, renderiza los hijos (el contenido), de lo contrario nada
};
