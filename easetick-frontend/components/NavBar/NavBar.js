'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './NavBar.module.css';

const navItems = [
  { href: "/", src: "/imagenes/home.png", alt: "Home", label: "Inicio" },
  { href: "/ver-ticket", src: "/imagenes/ticket.png", alt: "Tickets", label: "Tickets" },
  { href: "/cliente", src: "/imagenes/cliente.png", alt: "Clientes", label: "Clientes" },
  { href: "/empleados", src: "/imagenes/empleado.png", alt: "Empleados", label: "Empleados" },
  { href: "/estadistica", src: "/imagenes/estadistica.png", alt: "Estadisticas", label: "Estadísticas" },
  { href: "/configuracion", src: "/imagenes/configuracion.png", alt: "Configuracion", label: "Configuración" },
];

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
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
        <Image src="/imagenes/LogoEaseTick.png" alt="LogoEaseTick" width={32} height={32} />
      </div>
    </div>
  );
};

export default Navbar;