// utils/ProtectedRoutes.js
'use client';

import { TokenContext } from "@/context/TokenContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { isLoggedIn, userRole, loading } = useContext(TokenContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn && router.pathname !== "/login") {
        router.push("/");
      } else if (isLoggedIn && router.pathname === "/login") {
        router.push('/');
      } else if (isLoggedIn && allowedRoles && userRole != null && !allowedRoles.includes(userRole)) {
        router.push('/not-found');
      }
    }
  }, [isLoggedIn, userRole, loading, router, allowedRoles]);

  if (loading || !isLoggedIn) return null; // Muestra nada o un loader mientras carga

  return <>{children}</>; // Renderiza los hijos normalmente
};
