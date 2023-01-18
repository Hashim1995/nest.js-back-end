import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Get()
  getFullTasks(): ITask[] {
    return this.tasksServices.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): ITask {
    return this.tasksServices.createTask(createTaskDto);
  }

  @Delete()
  deleteAllTasks() {
    return this.tasksServices.deleteAllTasks();
  }
}
