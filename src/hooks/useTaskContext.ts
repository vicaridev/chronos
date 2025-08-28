import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext/TaskContext";


export const useTaskContext = () => {
  return useContext(TaskContext)
}