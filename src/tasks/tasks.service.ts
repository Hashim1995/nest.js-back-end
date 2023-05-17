import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'; // Import the Injectable decorator and the NotFoundException exception from the @nestjs/common module.
import { TaskStatus } from './task-status.enum'; // Import the ITask interface and the TaskStatus enum from the './tasks.model' file.
import { CreateTaskDto } from './dto/create-task.dto'; // Import the CreateTaskDto class from the './dto/create-task.dto' file.
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'; // Import the GetTasksFilterDto class from the './dto/get-tasks-filter.dto' file.
import { TasksRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { ITaskList } from './types/tasks.types';

@Injectable() // Decorate the TasksService class as an injectable provider.
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  getAllTasks(filterDto: GetTasksFilterDto): Promise<ITaskList> {
    return this.tasksRepository.getTasks(filterDto);
  }
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);
    if (!found) {
      throw new NotFoundException([`Task with ID:'${id}' not found`]);
    }
    return found;
  }

  async deleteAllTasks(): Promise<string> {
    await this.tasksRepository.clear();
    return 'all tasks has been removed ';
  }

  async deleteTaskById(id: string): Promise<string> {
    const found = await this.getTaskById(id);
    if (!found) {
      throw new NotFoundException([`Task with ID:'${id}' not found`]);
    }
    if (found.status === TaskStatus.DONE) {
      throw new BadRequestException(
        'You can not delete task which status is "DONE"',
      );
    } else {
      await this.tasksRepository.delete({ id: found.id });
      return `${id} task has been removed`;
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<string> {
    const FoundTask = await this.getTaskById(id);
    FoundTask.status = status;
    await this.tasksRepository.save(FoundTask);
    return 'Task status has been successfully changed';
  }
}
