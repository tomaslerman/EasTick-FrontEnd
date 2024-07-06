'use client'
import React from 'react';
import styles from './feedback.module.css';
import Image from 'next/image';

const Feedback = ({ total, positivo, neutral, negativo }) => {
    return (
        <div className={styles.feedbackContainer}>
            <div className={styles.header}>
                <h1>Feedback</h1>
                <a href="#">Ver detalles</a>
            </div>
            <div className={styles.content}>
                <div className={styles.item}>
                    <span>Total</span>
                    <span>{total}</span>
                </div>
                <div className={styles.item}>
                    <span>Positivo</span>
                    <Image src="/icons/positivo.svg" alt="Positivo" width={24} height={24} />
                    <span>{positivo}%</span>
                </div>
                <div className={styles.item}>
                    <span>Neutral</span>
                    <Image src="/icons/neutral.svg" alt="Neutral" width={24} height={24} />
                    <span>{neutral}%</span>
                </div>
                <div className={styles.item}>
                    <span>Negativo</span>
                    <Image src="/icons/negativo.svg" alt="Negativo" width={24} height={24} />
                    <span>{negativo}%</span>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
