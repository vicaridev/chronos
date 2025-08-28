import { Timer } from "lucide-react";
import styles from './styles.module.css';

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <Timer />
      <span>Chronos</span>
    </div>
  );
};