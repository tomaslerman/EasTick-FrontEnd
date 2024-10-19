'use client';
import React from 'react';
import BoxTexto from '../BoxTexto/BoxTexto';
import styles from './HelpCenter.module.css';

const FrequentQuestions = () => {
  const frequentQuestions = [
    {
      question: "¿Cómo creo un nuevo ticket?",
      answer: "Debes dirigirte al apartado de enviar nuevo ticket, este te dirigirá a una nueva página en la que debes ingresar un mail, la prioridad, el tipo de ticket, adjuntar un archivo, determinar el asunto y un mensaje, luego envías el ticket y es agregado."
    },
    {
      question: "¿Cómo puedo cancelar un ticket enviado?",
      answer: "Una vez que un ticket ha sido enviado, no puedes cancelarlo directamente. Sin embargo, puedes contactar a nuestro soporte a través del chat para que te asistan."
    },
    {
      question: "¿Recibiré una notificación cuando mi ticket sea respondido?",
      answer: "Sí, recibirás una notificación por correo electrónico cuando haya una actualización o respuesta a tu ticket."
    },
    {
      question: "¿Puedo actualizar la información de un ticket después de enviarlo?",
      answer: "No puedes editar la información de un ticket enviado. Si necesitas hacer cambios, puedes crear un nuevo ticket o responder al ticket existente con la información actualizada."
    },
    {
      question: "¿Qué debo hacer si no recibo respuesta a mi ticket?",
      answer: "Si no recibes respuesta en un plazo razonable, revisa tu carpeta de spam o promociones. Si aún así no encuentras la respuesta, puedes enviar un nuevo ticket preguntando sobre el estado del anterior."
    }
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