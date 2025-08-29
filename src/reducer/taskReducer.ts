import type { TaskStateModel } from "../models/TaskStateModel";
import { formatedSecondsToMinutes } from "../utils/formatSecondsToMinutes";
import { getNextCycle } from "../utils/getNextCycle";
import { TaskActionsTypes, type TaskActionModel } from "./actions/taskActions";

export const taskReducer = (state: TaskStateModel, action: TaskActionModel) => {
  switch(action.type){
    case TaskActionsTypes.START_TASK: {
      const newTask = action.payload;
      const nextCycle = getNextCycle(state.currentCycle);
      const secondsRemaining = newTask.duration * 60
      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formatedSecondsRemaining: formatedSecondsToMinutes(secondsRemaining),
        tasks: [...state.tasks, newTask]
      }
    }
    case TaskActionsTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formatedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, interruptDate: Date.now() };
          }
          return task;
        })
      
      }
    }
  }
  
}