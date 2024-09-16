'use client'
import React from 'react';
import styles from './feedback.module.css';
import Image from 'next/image';

const Feedback = ({ feedback }) => {
    return (
        <>
            {
                feedback &&
                <div className={styles.feedbackContainer}>
                    <div className={styles.header}>
                        <h1>Feedback</h1>
                        <a href="#">Ver detalles</a>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.item}>
                            <span>Total</span>
                            <span>{feedback.total}</span>
                        </div>
                        <div className={styles.item}>
                            <span>Positivo</span>
                            <Image src="/imagenes/positivo.png" alt="Positivo" width={35} height={35} />
                            <span>{feedback.positivo}%</span>
                        </div>
                        <div className={styles.item}>
                            <span>Neutral</span>
                            <Image src="/imagenes/neutral.png" alt="Neutral" width={35} height={35} />
                            <span>{feedback.neutral}%</span>
                        </div>
                        <div className={styles.item}>
                            <span>Negativo</span>
                            <Image src="/imagenes/negativo.png" alt="Negativo" width={35} height={35} />
                            <span>{feedback.negativo}%</span>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Feedback;
