import { Task } from '../task.entity';

export interface ITaskList {
  data: Task[];
  total: number;
}
