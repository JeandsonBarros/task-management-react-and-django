import styles from './Screens.module.css';

function Container({ children }) {

    return (

        <main className={styles.container}>
            {children}
        </main>

    );
}

export default Container;