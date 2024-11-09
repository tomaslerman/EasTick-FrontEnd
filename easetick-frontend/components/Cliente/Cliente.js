import { useRouter } from 'next/navigation';
import styles from './Cliente.module.css';
import axios from 'axios';

const Cliente = ({ id, name, email }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/FlowEmpleado/perfil-cliente/${id}`);
    };

    return (
        <div className={styles.clienteRow}>
            <div className={styles.clienteInfo}>
                <span 
                    onClick={handleClick}
                    className={styles.nameLink}
                    style={{ cursor: 'pointer', color: '#0066cc' }}
                >
                    {name}
                </span>
            </div>
            <div className={styles.email}>{email}</div>
        </div>
    );
};

export default Cliente; 