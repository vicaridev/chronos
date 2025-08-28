import styles from './styles.module.css';



export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a href="/about">Entenda como funciona a técnica pomodoro</a>
      <p>Chronos Pomodoro &copy; {new Date().getFullYear()}</p>
    </footer>
  );
};