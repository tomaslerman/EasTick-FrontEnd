'use client'
import styles from './styles.module.css';
import Navbar from "@/components/NavBar/NavBar";
import Header from "@/components/Header";
import { usePathname } from 'next/navigation'
import useTitle from "@/hooks/useTitle";

export default function Layout ({ children }) {
    const { titulo } = useTitle()
    const pathname = usePathname()
    const contains = pathname.includes("login") | pathname.includes("error")


    return (
        <div className={styles.layout}>
            {!contains && <Navbar />}
            <div className={styles.main}>
                {!contains && <Header titulo={titulo}/>}
                <div className={styles.allContainer}>
                    {children}
                </div>
            </div>
        </div>
    )
}