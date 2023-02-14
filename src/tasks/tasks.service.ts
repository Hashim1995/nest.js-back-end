import { Injectable } from '@nestjs/common';
import { ITask, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getAllTasks(): ITask[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): ITask[] {
    const { status, search } = filterDto;
    let tasks = this.tasks;
    if (status) {
      tasks = tasks.filter((item: ITask) => item.status === status);
    }
    if (search) {
      tasks = tasks.filter((item) => {
        if (item.title.includes(search) || item.description.includes(search)) {
          return true;
        } else {
          return false;
        }
      });
    }
    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): ITask {
    const { title, description } = createTaskDto;
    const task: ITask = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteAllTasks(): string {
    this.tasks.length = 0;
    return 'all tasks removed';
  }
  getTaskById(id: string): ITask {
    const res = this.tasks.find((task) => task.id === id);
    return res;
  }
  deleteTaskById(id: string): string {
    this.tasks.filter((item) => item.id !== id);
    return `${id} task has been removed`;
  }
  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
