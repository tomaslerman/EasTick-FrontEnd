import styles from './starRating.module.css';

export default function starRating({ puntuacion }) {
    const maxStars = 5;
    const filledStars = Math.round(puntuacion);
    
    return (
        <div className={styles.starContainer}>
            {[...Array(maxStars)].map((star, index) => (
                <span key={index} className={index < filledStars ? styles.filledStar : styles.emptyStar}>
                    ★
                </span>
            ))}
        </div>
    );
}