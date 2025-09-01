
import styles from './styles.module.css';

interface InputProps extends React.ComponentProps<'input'> {
  id: string;
  labelText: string;
}

export const Input = ({ id, labelText, ...props }: InputProps) => {
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <input className={styles.input} {...props} />
    </>
  );
};