import { History, Home, MoonIcon, SettingsIcon, SunIcon, } from "lucide-react";
import styles from './styles.module.css';
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

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
      <NavLink className={styles.menuLink} to="" aria-label="Ir para Home page" title="Home page">
        <Home className={styles.button} />
      </NavLink>
      <NavLink className={styles.menuLink} to="" aria-label="Ver histórico" title="Histórico">
        <History className={styles.button} />
      </NavLink>
      <NavLink className={styles.menuLink} to="" aria-label="Ir para configurações" title="Configurações">
        <SettingsIcon className={styles.button} />
      </NavLink>
      <NavLink className={styles.menuLink} to="" aria-label="Mudar tema" title="Mudar tema" onClick={handleTheme}>
        {nextThemeIcon[theme]}
      </NavLink>
    </nav>
  );
};