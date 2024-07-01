import React from 'react';
import Link from 'next/link';
import styles from './NavBar.module.css'
const Navbar = () => {
    return (
        <div className={styles.navBar}>
        <div className={styles.navItem}>
            <img src="/icons/home.svg" alt="Home" />
        </div>
        <div className={styles.navItem}>
            <img src="/icons/ticket.svg" alt="Tickets" />
        </div>
        <div className={styles.navItem}>
            <img src="/icons/projects.svg" alt="Projects" />
        </div>
        <div className={styles.navItem}>
            <img src="/icons/users.svg" alt="Users" />
        </div>
        <div className={styles.navItem}>
            <img src="/icons/analytics.svg" alt="Analytics" />
        </div>
        <div className={styles.navItem}>
            <img src="/icons/settings.svg" alt="Settings" />
        </div>
        <div className={styles.navItem}>
            <img src="/icons/tools.svg" alt="Tools" />
        </div>
    </div>
    );
  };
  
  export default Navbar;