import React from 'react';
import Image from 'next/image';
import styles from './BoxTexto.module.css';

const BoxTexto = ({ question, answer }) => {
  return (
    <div className={styles.boxTexto}>
      <div className={styles.questionContainer}>
        <div className={styles.imageContainer}>
          <Image
            src="/imagenes/ticket.png"
            alt="Ticket"
            width={24}
            height={24}
            className={styles.ticketImage}
          />
        </div>
        <div className={styles.questionContent}>
          <h3 className={styles.question}>{question}</h3>
          <p className={styles.answer}>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default BoxTexto;