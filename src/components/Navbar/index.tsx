import { History, Home, MoonIcon, SettingsIcon, SunIcon, } from "lucide-react";
import styles from './styles.module.css';
import { useState, useEffect } from "react";
import { RouterLink } from "../RouterLink";

type AvailableThemes = 'dark' | 'light';


export const Navbar = () => {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storagedTheme = localStorage.getItem('theme') as AvailableThemes || 'dark';

    return storagedTheme;
  });

  const nextThemeIcon = {
    dark: <SunIcon className={styles.button} />,
    light: <MoonIcon className={styles.button} />
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleTheme = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });
  };

  return (
    <nav className={styles.menu}>
      <RouterLink className={styles.menuLink} href="/" aria-label="Ir para Home page" title="Home page">
        <Home className={styles.button} />
      </RouterLink>
      <RouterLink className={styles.menuLink} href="history" aria-label="Ver histórico" title="Histórico">
        <History className={styles.button} />
      </RouterLink>
      <RouterLink className={styles.menuLink} href="settings" aria-label="Ir para configurações" title="Configurações">
        <SettingsIcon className={styles.button} />
      </RouterLink>
      <RouterLink className={styles.menuLink} href="" aria-label="Mudar tema" title="Mudar tema" onClick={handleTheme}>
        {nextThemeIcon[theme]}
      </RouterLink>
    </nav>
  );
};