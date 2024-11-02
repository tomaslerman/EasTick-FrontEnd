'use client';

import { useContext, useEffect } from 'react';
import { TokenContext } from '@/context/TokenContext';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';

export const ProtectedRoutes = ({ children, allowedRoles }) => {
    const { userRole, loading } = useContext(TokenContext);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !allowedRoles.includes(userRole)) {
            notFound();
        }
    }, [loading, userRole, allowedRoles]);

    if (loading || !allowedRoles.includes(userRole)) {
        return null;
    }

    return children;
};
