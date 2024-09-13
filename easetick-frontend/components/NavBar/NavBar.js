'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './NavBar.module.css';

const NavItem = ({ href, src, alt, tooltip }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={styles.navItem}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={href}>
        <div className={styles.iconWrapper}>
          <Image src={src} alt={alt} width={32} height={32} />
          {isHovered && <span className={styles.tooltip}>{tooltip}</span>}
        </div>
      </Link>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className={styles.navBar}>
      <NavItem href="/" src="/imagenes/home.png" alt="Home" tooltip="Inicio" />
      <NavItem href="/ver-ticket" src="/imagenes/ticket.png" alt="Tickets" tooltip="Tickets" />
      <NavItem href="/cliente" src="/imagenes/cliente.png" alt="Clientes" tooltip="Clientes" />
      <NavItem href="/empleados" src="/imagenes/empleado.png" alt="Empleados" tooltip="Empleados" />
      <NavItem href="/estadistica" src="/imagenes/estadistica.png" alt="Estadisticas" tooltip="Estadísticas" />
      <NavItem href="/configuracion" src="/imagenes/configuracion.png" alt="Configuracion" tooltip="Configuración" />
      <div className={`${styles.navItem} ${styles.logoItem}`}>
        <Image src="/imagenes/LogoEaseTick.png" alt="LogoEaseTick" width={40} height={40} />
      </div>
    </nav>
  );
};

export default Navbar;