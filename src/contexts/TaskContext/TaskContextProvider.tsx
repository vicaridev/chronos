import { useEffect, useReducer, useRef } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "../../reducer/taskReducer";
import { TimerWorkerManager } from "../../workers/timerWorkerManager";
import { TaskActionsTypes } from "../../reducer/actions/taskActions";
import { loadBeep } from "../../utils/loadBeep";
import type { TaskStateModel } from "../../models/TaskStateModel";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export const TaskContextProvider = ({ children }: TaskContextProviderProps) => {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storagedState = localStorage.getItem('state');

    if (storagedState === null) return initialTaskState;

    const parsedStoragedState = JSON.parse(storagedState) as TaskStateModel;

    return {
      ...parsedStoragedState,
      activeTask: null,
      secondsRemaining: 0,
      formatedSecondsRemaining: '00:00'
    };
  });
  const playBeepRef = useRef<() => void | null>(null);

  const worker = TimerWorkerManager.getInstance();

  worker.onmessage(e => {
    const countDownSeconds = e.data;

    if (countDownSeconds <= 0) {
      if (playBeepRef.current) {
        playBeepRef.current();
        playBeepRef.current = null;
      }
      dispatch({ type: TaskActionsTypes.COMPLETE_TASK });
      worker.terminate();
    } else {
      dispatch({ type: TaskActionsTypes.COUNT_DOWN, payload: { secondsRemaining: countDownSeconds } });
    }
  });

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));


    if (!state.activeTask) {
      worker.terminate();
    }

    document.title = `${state.formatedSecondsRemaining}`;
    worker.postMessage(state);
  }, [worker, state]);

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );

};