import { useTaskContext } from '../../../hooks/useTaskContext';
import styles from './styles.module.css';


export const CountDown = () => {

  const { state } = useTaskContext();
  return (
    <div className={styles.countdown}>{state.formatedSecondsRemaining}</div>
  );
};