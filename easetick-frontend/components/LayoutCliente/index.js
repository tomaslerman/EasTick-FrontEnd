'use client'
import styles from './styles.module.css';
import NavbarCliente from '../NavBarCliente/NavBarCliente';
import HeaderCliente from "@/components/HeaderCliente";
import useTitle from "@/hooks/useTitle";

export default function Layout ({ children }) {
    const { titulo } = useTitle()

    return (
        <div className={styles.layout}>
            <NavbarCliente />
            <div className={styles.main}>
                <HeaderCliente titulo={titulo}/>
                <div className={styles.allContainer}>
                    {children}
                </div>
            </div>
        </div>
    )
}