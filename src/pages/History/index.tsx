import { TrashIcon } from "lucide-react";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import styles from './styles.module.css';
import { useTaskContext } from "../../hooks/useTaskContext";
import { formatDate } from "../../utils/formateDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { taskTypeDictionary } from "../../utils/taskTypeDictionary";
import { useEffect, useState } from "react";
import { sortTasks, type SortTasksOptions } from "../../utils/sortTasks";
import { TaskActionsTypes } from "../../reducer/actions/taskActions";
import { showMessage } from "../../adapters/showMessage";

export const History = () => {
  const { state, dispatch } = useTaskContext();
  const [deleteHistory, setDeleteHistory] = useState(false);
  const hasTasks = state.tasks.length > 0;
  const [sortTasksOptions, setSortTaskOptions] = useState<SortTasksOptions>(() => {
    return {
      tasks: sortTasks({ tasks: state.tasks }),
      field: 'startDate',
      direction: 'desc',
    };
  });

  useEffect(() => {
    setSortTaskOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field
      })
    }));
  }, [state.tasks]);

  useEffect(() => {
    if (!deleteHistory) return;
    setDeleteHistory(!deleteHistory);
    dispatch({ type: TaskActionsTypes.RESET_STATE });

  }, [deleteHistory, dispatch]);

  useEffect(() => {
    document.title = 'Histórico';
    return () => {
      showMessage.dismiss();
    };
  }, []);

  const handleSortTasks = ({ field }: Pick<SortTasksOptions, 'field'>) => {
    const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc';

    setSortTaskOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTasksOptions.tasks,
        field
      }),
      direction: newDirection,
      field
    });
  };

  const handleResetHistory = () => {
    showMessage.dismiss();
    showMessage.confirm('Tem certeza?', (confirmation) => {
      setDeleteHistory(confirmation);
    });
  };
  return (
    <Container>
      <Heading>
        <span>History</span>
        {hasTasks && (
          <span className={styles.buttonContainer}>
            <Button onClick={handleResetHistory} icon={<TrashIcon />} color="red" aria-label="Apagar todo o histórico" title="Apagar todo o histórico" />
          </span>
        )}
      </Heading>
      <Container>
        {hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr className={styles.trHeading}>
                  <th onClick={() => handleSortTasks({ field: 'name' })} className={styles.thSort}>Tarefa ↕</th>
                  <th onClick={() => handleSortTasks({ field: 'duration' })} className={styles.thSort}>Duração ↕</th>
                  <th onClick={() => handleSortTasks({ field: 'startDate' })} className={styles.thSort}>Data ↕</th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortTasksOptions.tasks.map((task) => {
                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeDictionary[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {!hasTasks && (<p style={{ textAlign: 'center', fontWeight: 'bold' }}>Ainda não existem tasks no histórico</p>)}
      </Container>
    </Container>
  );
};