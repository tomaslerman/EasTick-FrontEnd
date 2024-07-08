'use client'
import React from 'react';
import Link from 'next/link';
import styles from './NavBar.module.css';
import Image from 'next/image';

const Navbar = () => {
    return (
        <div className={styles.navBar}>
            <div className={styles.navItem}>
                <Image src="/imagenes/home.png" alt="Home" width={24} height={24} />
            </div>
            <div className={styles.navItem}>
            <Link href={"/ver-ticket"}><Image src="/imagenes/ticket.png" alt="Tickets" width={24} height={24} /></Link>
            </div>
            <div className={styles.navItem}>
                <Image src="/imagenes/cliente.png" alt="Clientes" width={24} height={24} />
            </div>
            <div className={styles.navItem}>
                <Image src="/imagenes/empleado.png" alt="Empleados" width={24} height={24} />
            </div>
            <div className={styles.navItem}>
                <Image src="/imagenes/estadistica.png" alt="Estadisticas" width={24} height={24} />
            </div>
            <div className={styles.navItem}>
                <Image src="/imagenes/configuracion.png" alt="Configuracion" width={24} height={24} />
            </div>
            <div className={`${styles.navItem} ${styles.logoItem}`}>
                <Image src="/imagenes/LogoEaseTick.png" alt="LogoEaseTick" width={24} height={24} />
            </div>
        </div>
    );
};

export default Navbar;
