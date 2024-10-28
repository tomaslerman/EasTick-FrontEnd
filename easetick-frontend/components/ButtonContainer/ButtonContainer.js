'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ButtonContainer.module.css';

const ButtonContainer = () => {
  return (
    <div className={styles.buttonContainer}>
      <Link href="/FlowCliente/nuevo-ticket" passHref className={styles.link}>
        <button className={`${styles.button} ${styles.primaryButton}`}>
          Enviar nuevo ticket
          <Image
            src="/imagenes/ticket.png"
            alt="Nuevo ticket"
            width={20}
            height={20}
            className={styles.icon}
          />
        </button>
      </Link>
      <Link href="/FlowCliente/verTicketsCliente" passHref className={styles.link}>
        <button className={`${styles.button} ${styles.secondaryButton}`}>
          Ver mis tickets
          <Image
            src="/imagenes/ticket.png"
            alt="Ver tickets"
            width={20}
            height={20}
            className={styles.icon}
          />
        </button>
      </Link>
    </div>
  );
};

export default ButtonContainer;
