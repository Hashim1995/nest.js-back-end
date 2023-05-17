import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { ITaskList } from './types/tasks.types';
import { CheckIsUUID } from './custom-pipes/check-isUUID';

@Controller('tasks') // This defines the base route for all routes defined in this controller
export class TasksController {
  constructor(private tasksServices: TasksService) {} // This is the constructor for the controller that injects the TasksService dependency into it.

  // @Get() // This defines a GET route for getting all tasks
  // getTasks(@Query() filterDto: GetTasksFilterDto): ITask[] {
  //   if (Object.keys(filterDto).length) {
  //     // This checks if the request has any query parameters, if yes, it calls the tasksService method to get tasks with filters
  //     return this.tasksServices.getTasksWithFilters(filterDto);
  //   } else {
  //     // If no query parameter exists, then it just returns all tasks
  //     return this.tasksServices.getAllTasks();
  //   }
  // }

  @Get()
  getAllTasks(): Promise<ITaskList> {
    return this.tasksServices.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id', CheckIsUUID) id: string): Promise<Task> {
    return this.tasksServices.getTaskById(id);
  }

  @Post() // This defines a POST route for creating a new task
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksServices.createTask(createTaskDto);
  }

  @Delete(':id')
  deleteTaskById(@Param('id', CheckIsUUID) id): Promise<string> {
    return this.tasksServices.deleteTaskById(id);
  }

  @Delete('')
  deleteAllTasks(): Promise<string> {
    return this.tasksServices.deleteAllTasks();
  }

  // @Patch('/:id/status') // This defines a PATCH route for updating a task's status by ID
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() UpdateTaskStatusDto: UpdateTaskStatusDto,
  // ): ITask {
  //   const { status } = UpdateTaskStatusDto;
  //   return this.tasksServices.updateTaskStatus(id, status);
  // }
}
