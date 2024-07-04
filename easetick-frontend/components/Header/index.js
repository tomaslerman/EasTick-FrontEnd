import styles from './Header.module.css';
import React from 'react';

export default function Header() {
    return (
        <div className={styles.header}>
            <h1>Home</h1>
            <div className={styles.icons}>
                <img src="/icons/bell.svg" alt="Notifications" className={styles.icon} />
                <img src="/icons/user.svg" alt="User" className={styles.icon} />
            </div>
        </div>
    );
}
