import styles from './styles.module.css';
import { Navbar } from "../Navbar";
import { Logo } from "../Logo";



export const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <div className={styles.navtools}>
        <Navbar />
      </div>
    </header>
  );
};