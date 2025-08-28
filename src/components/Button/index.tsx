
import type { ReactNode } from 'react';
import styles from './styles.module.css';

interface ButtonProps extends React.ComponentProps<'button'> {
  icon: ReactNode;
  color?: 'green' | 'red';
}

export const Button = ({ icon, color = 'green', ...props }: ButtonProps) => {
  return (
    <div >
      <button className={`${styles.button} ${styles[color]}`} {...props}>
        {icon}
      </button>
    </div>
  );
};