'use client';
import React, { useState, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './NavBar.module.css';
import { ProtectedRoutes } from '@/app/utils/ProtectedRoutes';
import { TokenContext } from '@/context/TokenContext';

const navItems = [
  { href: "/FlowEmpleado/home", src: "/imagenes/home.png", alt: "Home", label: "Inicio" },
  { href: "/FlowEmpleado/ver-ticket", src: "/imagenes/ticket.png", alt: "Tickets", label: "Tickets" },
  { href: "/FlowEmpleado/cliente", src: "/imagenes/cliente.png", alt: "Clientes", label: "Clientes" },
  { href: "/FlowEmpleado/empleados", src: "/imagenes/empleado.png", alt: "Empleados", label: "Empleados" },
  { href: "/FlowEmpleado/estadistica", src: "/imagenes/estadistica.png", alt: "Estadisticas", label: "Estadísticas" },
  { href: "/FlowEmpleado/configuracion", src: "/imagenes/configuracion.png", alt: "Configuracion", label: "Configuración" },
];

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const { userRole } = useContext(TokenContext);

  if (userRole !== 2 && userRole !== 3) return null;

  return (
    <ProtectedRoutes allowedRoles={[2, 3]}>
      <div className={styles.navBar}>
        <div className={styles.navItems}>
          {navItems.map((item, index) => (
            <div
              key={index}
              className={styles.navItem}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link href={item.href} className={styles.navLink}>
                <Image src={item.src} alt={item.alt} width={32} height={32} />
                <span className={styles.navText}>{item.label}</span>
              </Link>
            </div>
          ))}
        </div>
        <div className={styles.logoItem}>
          <Image 
            src="/imagenes/LogoVectorizadoGris_EaseTick.png" 
            alt="LogoEaseTick" 
            width={45} 
            height={45}
          />
        </div>
      </div>
    </ProtectedRoutes>
  );
};

export default Navbar;
