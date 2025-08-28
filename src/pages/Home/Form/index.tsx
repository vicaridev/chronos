import styles from './styles.module.css';
import { Input } from '../../../components/Input';
import { Cycles } from '../Cycles';
import { Button } from '../../../components/Button';
import { PlayCircleIcon } from 'lucide-react';

export const Form = () => {
  return (
    <form action="" className={styles.form}>
      <div className='formRow'>
        <Input labelText='task' id='taskName' type='text' placeholder='Ex.: Estudar para a prova' />
      </div>
      <div className='formRow'>
        <span>Nesse ciclo <strong>foque</strong> por <strong>25 min.</strong></span>
      </div>
      <div className='formRow'>
        <Cycles />
      </div>
      <Button icon={<PlayCircleIcon />} />
    </form>
  );
};