import styles from './feedback.module.css';
import StarRating from './starRating';

export default function feedback({ puntuacion }) {
    return (
        <div className={styles.feedbackContainer}>
            <div className={styles.header}>
                <h2>Feedback</h2>
                <a href="#" className={styles.viewDetails}>Ver detalles</a>
            </div>
            <StarRating puntuacion={puntuacion} />
        </div>
    );
}
