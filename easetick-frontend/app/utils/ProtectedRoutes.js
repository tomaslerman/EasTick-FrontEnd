'use client';

import { useContext, useEffect } from 'react';
import { TokenContext } from '@/context/TokenContext';
import { useRouter } from 'next/navigation';

export const ProtectedRoutes = ({ children, allowedRoles }) => {
    const { isLoggedIn, userRole, loading } = useContext(TokenContext);
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!isLoggedIn) {
                router.push('/');
            } else if (!allowedRoles.includes(userRole)) {
                if (userRole === 1) {
                    router.push('/FlowCliente/home');
                } else if (userRole === 2 || userRole === 3) {
                    router.push('/FlowEmpleado/home');
                }
            }
        }
    }, [isLoggedIn, userRole, loading, router, allowedRoles]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!isLoggedIn || !allowedRoles.includes(userRole)) {
        return null;
    }

    return <>{children}</>;
};
