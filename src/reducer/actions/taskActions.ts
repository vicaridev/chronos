import type { TaskModel } from "../../models/task.model";

export enum TaskActionsTypes  {
  START_TASK = 'START_TASK',
  INTERRUPT_TASK = 'INTERRUPT_TASK'
}

export type TaskActionModel = 
  | {
    type: TaskActionsTypes.START_TASK;
    payload: TaskModel
  } 
  | {
    type: TaskActionsTypes.INTERRUPT_TASK;
  }