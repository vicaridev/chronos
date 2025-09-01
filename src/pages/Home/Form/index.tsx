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
import { Tips } from '../../../components/Tips/tips';
import { showMessage } from '../../../adapters/showMessage';
import { Container } from '../../../components/Container';
import styles from './styles.module.css';

export const Form = () => {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);



  const handleCreateNewTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    showMessage.dismiss();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      showMessage.warn('Digite o nome da tarefa');
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

    showMessage.success('Tarefa iniciada');

  };

  const handleInterruptTask = () => {
    showMessage.dismiss();
    dispatch({ type: TaskActionsTypes.INTERRUPT_TASK });
    showMessage.error('Tarefa interrompida');
  };

  return (
    <Container>
      <form onSubmit={handleCreateNewTask} action="" className={styles.form}>
        <div className={styles.formRow}>
          <Input
            labelText='task'
            id='taskName'
            type='text'
            placeholder='Ex.: Estudar para a prova'
            ref={taskNameInput}
            disabled={!!state.activeTask}
            defaultValue={lastTaskName}
          />
        </div>
        <div className={styles.formRow}>
          <Tips task={state} nextCycleType={nextCycleType} />
        </div>
        {state.currentCycle > 0 && (
          <div className={styles.formRow}>
            <Cycles />
          </div>
        )}
        <div className={styles.formRow}>
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

    </Container>
  );
};