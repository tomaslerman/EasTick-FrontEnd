'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './NavBar.module.css';
import { ProtectedRoutes } from '@/app/utils/ProtectedRoutes';

const nvItems = [
  { href: "/FlowEmpleado/home", src: "/imagenes/home.png", alt: "Home", label: "Inicio" },
  { href: "/FlowEmpleado/ver-ticket", src: "/imagenes/ticket.png", alt: "Tickets", label: "Tickets" },
  { href: "/FlowEmpleado/cliente", src: "/imagenes/cliente.png", alt: "Clientes", label: "Clientes" },
  { href: "/FlowEmpleado/empleados", src: "/imagenes/empleado.png", alt: "Empleados", label: "Empleados" },
  { href: "/FlowEmpleado/estadistica", src: "/imagenes/estadistica.png", alt: "Estadisticas", label: "Estadísticas" },
  { href: "/FlowEmpleado/configuracion", src: "/imagenes/configuracion.png", alt: "Configuracion", label: "Configuración" },
];

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <ProtectedRoutes>
    <div className={styles.navBar}>
      {navItems.map((item, index) => (
        <div
          key={index}
          className={styles.navItem}
          onMouseEnter={() => setHoveredItem(index)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <Link href={item.href} className={styles.navLink}>
            <Image src={item.src} alt={item.alt} width={32} height={32} />
            {hoveredItem === index && <span className={styles.hoverText}>{item.label}</span>}
          </Link>
        </div>
      ))}
      <div className={`${styles.navItem} ${styles.logoItem}`}>
        <Image src="/imagenes/LogoVectorizadoGris_EaseTick.png" alt="LogoEaseTick" width={40} height={40} />
      </div>
    </div>
    </ProtectedRoutes>
  );
};

export default Navbar;