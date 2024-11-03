// layout.js
'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from '@/components/Layout';
import LayoutCliente from '@/components/LayoutCliente';
import { TitleProvider } from '@/context/title';
const inter = Inter({ subsets: ["latin"] });
import TokenProvider from "@/context/TokenContext";
import { useContext } from "react";
import { TokenContext } from "@/context/TokenContext";
import { usePathname } from 'next/navigation';

const LayoutWrapper = ({ children }) => {
  const { userRole } = useContext(TokenContext);
  const pathname = usePathname();

  // Si estamos en la página de login, retornamos los children directamente
  if (pathname === '/') {
    return children;
  }
  
  // Para el resto de las páginas, aplicamos el layout correspondiente
  return userRole === 1 ? (
    <LayoutCliente>{children}</LayoutCliente>
  ) : (
    <Layout>{children}</Layout>
  );
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TokenProvider>
          <TitleProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </TitleProvider>
        </TokenProvider>
      </body>
    </html>
  );
}