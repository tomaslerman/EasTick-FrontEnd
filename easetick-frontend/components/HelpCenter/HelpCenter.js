'use client';
import React from 'react';
import styles from './HelpCenter.module.css';
import Image from 'next/image';

export default function HelpCenter() {
    const questions = [
        {
            id: 1,
            question: "¿Cómo creo un nuevo ticket?",
            answer: "Debes dirigirte al apartado de enviar nuevo ticket, este te dirigirá a una nueva página en la que debes ingresar un mail, la prioridad, el tipo de ticket, adjuntar un archivo, determinar el asunto y un mensaje, luego envías el ticket y es agregado."
        },
        {
            id: 2,
            question: "¿Cómo puedo cancelar un ticket enviado?",
            answer: "Para cancelar un ticket, dirígete a 'Ver mis tickets', encuentra el ticket que deseas cancelar y utiliza la opción de cancelación disponible."
        },
        {
            id: 3,
            question: "¿Cómo puedo ver el estado de mi ticket?",
            answer: "Puedes verificar el estado de tu ticket en la sección 'Ver mis tickets', donde encontrarás toda la información actualizada sobre tus solicitudes."
        },
        {
            id: 4,
            question: "¿Qué hago si necesito modificar un ticket?",
            answer: "Una vez enviado el ticket, puedes agregar comentarios adicionales a través de la sección de comentarios en los detalles del ticket."
        }
    ];

    return (
        <div className={styles.helpCenter}>
            <div className={styles.helpHeader}>
                <div className={styles.questionIcon}>?</div>
                <h2 className={styles.helpTitle}>Dudas frecuentes</h2>
            </div>
            
            <div className={styles.questionsScroll}>
                <div className={styles.questionsList}>
                    {questions.map((q) => (
                        <div key={q.id} className={styles.questionCard}>
                            <h3 className={styles.questionTitle}>
                                <div className={styles.questionIconSmall}>?</div>
                                {q.question}
                            </h3>
                            <p className={styles.answer}>{q.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}