'use client';
import React from 'react';
import BoxTexto from '../BoxTexto/BoxTexto';
import styles from './FrequentQuestions.module.css';

const FrequentQuestions = () => {
    const frequentQuestions = [
      {
        question: "¿Cómo creo un nuevo ticket?",
        answer: "Debes dirigirte al apartado de enviar nuevo ticket, este te dirigirá a una nueva página en la que debes ingresar un mail, la prioridad, el tipo de ticket, adjuntar un archivo, determinar el asunto y un mensaje, luego envías el ticket y es agregado."
      },
      // Añade más preguntas si es necesario
    ];
  
    return (
      <div className={styles.frequentQuestionsContainer}>
        <h2 className={styles.sectionTitle}>Dudas frecuentes</h2>
        <div className={styles.questionsContainer}>
          {frequentQuestions.map((item, index) => (
            <BoxTexto key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    );
  };
  
  export default FrequentQuestions;