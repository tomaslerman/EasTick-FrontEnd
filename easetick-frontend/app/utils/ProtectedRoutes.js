'use client';

import { TokenContext } from "@/context/TokenContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export const ProtectedRoutes = ({ children }) => {
  const router = useRouter();
  const { isLoggedIn } = useContext(TokenContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn && router.pathname !== "/login") {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, router]);

  if (loading) {
    return <div>Loading...</div>; // Mostrar mensaje de carga mientras se verifica la autenticación
  }

  if (!isLoggedIn && router.pathname !== "/login") {
    return <h2>Acceso Restringido</h2>; // En caso de que no redirija, muestra mensaje
  }

  return children;
};
