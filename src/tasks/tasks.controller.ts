import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { ITaskList } from './types/tasks.types';
import { CheckIsUUID } from './custom-pipes/check-isUUID';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks') // This defines the base route for all routes defined in this controller
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksServices: TasksService) {} // This is the constructor for the controller that injects the TasksService dependency into it.

  @Get()
  getAllTasks(@Query() filterDto: GetTasksFilterDto): Promise<ITaskList> {
    return this.tasksServices.getAllTasks(filterDto);
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

  // delete all tasks from table
  @Delete('')
  deleteAllTasks(): Promise<string> {
    return this.tasksServices.deleteAllTasks();
  }

  @Patch('/:id/status') // This defines a PATCH route for updating a task's status by ID
  updateTaskStatus(
    @Param('id') id: string,
    @Body() UpdateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<string> {
    const { status } = UpdateTaskStatusDto;
    return this.tasksServices.updateTaskStatus(id, status);
  }
}
