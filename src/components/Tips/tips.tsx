import type { TaskModel } from "../../models/task.model";
import type { TaskStateModel } from "../../models/TaskStateModel";

type TipsProps = {
  task: TaskStateModel;
  nextCycleType: TaskModel['type'];
};

export const Tips = ({ task, nextCycleType }: TipsProps) => {
  const tipsForActiveTask = {
    workTime: <span>Foque por {task.config.workTime}min</span>,
    shortBreakTime: <span>Descanse por <b>{task.config.shortBreakTime}min</b></span>,
    longBreakTime: <span>Descanse por <b>{task.config.longBreakTime}min</b></span>
  };

  const tipsForNotActiveTask = {
    workTime: <span>Próximo ciclo é de <b>{task.config.workTime}min</b></span>,
    shortBreakTime: <span>Próximo descanso é de <b>{task.config.shortBreakTime}min</b></span>,
    longBreakTime: <span>Próximo descanso é de <b>{task.config.longBreakTime}min</b></span>
  };
  return (
    <>
      {!!task.activeTask && tipsForActiveTask[task.activeTask.type]}
      {!task.activeTask && tipsForNotActiveTask[nextCycleType]}
    </>
  );
};