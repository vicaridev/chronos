import type { TaskModel } from "../../models/task.model";

export enum TaskActionsTypes  {
  START_TASK = 'START_TASK',
  INTERRUPT_TASK = 'INTERRUPT_TASK',
  COUNT_DOWN = 'COUNT_DOWN',
  COMPLETE_TASK = 'COMPLETE_TASK'
}

export type TaskActionsWithPayload = 
  | {
    type: TaskActionsTypes.START_TASK;
    payload: TaskModel
  } 
  | {
    type: TaskActionsTypes.COUNT_DOWN,
    payload: {secondsRemaining: number}
  }

export type TaskActionsWithoutPayload = 
  | {
    type: TaskActionsTypes.INTERRUPT_TASK;
  }
  | {
    type: TaskActionsTypes.COMPLETE_TASK
  }



  export type TaskActionModel = | TaskActionsWithPayload | TaskActionsWithoutPayload