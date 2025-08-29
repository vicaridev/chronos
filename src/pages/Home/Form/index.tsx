import styles from './styles.module.css';
import { Input } from '../../../components/Input';
import { Cycles } from '../Cycles';
import { Button } from '../../../components/Button';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { useRef } from 'react';
import type { TaskModel } from '../../../models/task.model';
import { useTaskContext } from '../../../hooks/useTaskContext';
import { getNextCycle } from '../../../utils/getNextCycle';
import { getNextCycleType } from '../../../utils/getNextCycleType';
import { TaskActionsTypes } from '../../../reducer/actions/taskActions';

export const Form = () => {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const handleCreateNewTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      alert('Digite o nome da tarefa');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completedDate: null,
      interruptedDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType
    };

    dispatch({ type: TaskActionsTypes.START_TASK, payload: newTask });
  };

  const handleInterruptTask = () => {
    dispatch({ type: TaskActionsTypes.INTERRUPT_TASK });
  };

  return (
    <form onSubmit={handleCreateNewTask} action="" className={styles.form}>
      <div className='formRow'>
        <Input
          labelText='task'
          id='taskName'
          type='text'
          placeholder='Ex.: Estudar para a prova'
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>
      <div className='formRow'>
        <span>Nesse ciclo <strong>foque</strong> por <strong>25 min.</strong></span>
      </div>
      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}
      <div className='formRow'>
        {!state.activeTask ? (
          <Button
            type='submit'
            aria-label='Iniciar nova tarefa'
            title='Iniciar nova tarefa'
            icon={<PlayCircleIcon />}
            key="startTaskTimer"
          />
        ) : (
          <Button
            type='button'
            aria-label='Parar tarefa'
            title='Interromper tarefa atual'
            color='red'
            icon={<StopCircleIcon />}
            onClick={handleInterruptTask}
            key="resetTaskTimer"
          />
        )}
      </div>
    </form>
  );
};