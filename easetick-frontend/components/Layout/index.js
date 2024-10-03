'use client'
import styles from './styles.module.css';
import Navbar from "@/components/NavBar/NavBar";
import Header from "@/components/Header";
import useTitle from "@/hooks/useTitle";

export default function Layout ({ children }) {
    const { titulo } = useTitle()

    return (
        
        <div className={styles.layout}>
            <Navbar />
            <div className={styles.main}>
                <Header titulo={titulo}/>
                <div className={styles.allContainer}>
                    {children}
                </div>
            </div>
        </div>
    )
}