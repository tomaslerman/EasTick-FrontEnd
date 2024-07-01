import styles from './feedback.module.css';

export default function feedback({ puntuacion }) {
    return (
        <div className={styles.feedbackContainer}>
            <div className={styles.header}>
                <h2>Feedback</h2>
                <a href="#" className={styles.viewDetails}>Ver detalles</a>
            </div>
             <h2>{puntuacion}</h2>
        </div>
    );
}
