
import styles from './styles.module.css';


export const Cycles = () => {
  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>
      <div className={styles.cycleDots}>
        <span className={`${styles.cycleDot} ${styles.workTime}`} />
        <span className={`${styles.cycleDot} ${styles.shorBreaktTime}`} />
        <span className={`${styles.cycleDot} ${styles.workTime}`} />
        <span className={`${styles.cycleDot} ${styles.shorBreaktTime}`} />
        <span className={`${styles.cycleDot} ${styles.workTime}`} />
        <span className={`${styles.cycleDot} ${styles.shorBreakTime}`} />
        <span className={`${styles.cycleDot} ${styles.workTime}`} />
        <span className={`${styles.cycleDot} ${styles.longBreakTime}`} />
      </div>
    </div>
  );
};