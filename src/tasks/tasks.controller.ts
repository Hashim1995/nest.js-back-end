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
import { ITask, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks') // This defines the base route for all routes defined in this controller
export class TasksController {
  constructor(private tasksServices: TasksService) {} // This is the constructor for the controller that injects the TasksService dependency into it.

  @Get() // This defines a GET route for getting all tasks
  getTasks(@Query() filterDto: GetTasksFilterDto): ITask[] {
    if (Object.keys(filterDto).length) {
      // This checks if the request has any query parameters, if yes, it calls the tasksService method to get tasks with filters
      return this.tasksServices.getTasksWithFilters(filterDto);
    } else {
      // If no query parameter exists, then it just returns all tasks
      return this.tasksServices.getAllTasks();
    }
  }

  @Get('/:id') // This defines a GET route for getting a task by ID
  getTaskById(@Param('id') id: string) {
    return this.tasksServices.getTaskById(id);
  }

  @Post() // This defines a POST route for creating a new task
  createTask(@Body() createTaskDto: CreateTaskDto): ITask {
    return this.tasksServices.createTask(createTaskDto);
  }

  @Delete() // This defines a DELETE route for deleting all tasks from the list
  deleteAllTasks() {
    return this.tasksServices.deleteAllTasks();
  }

  @Delete('/:id') // This defines a DELETE route for removing a task from the list by ID
  deleteTaskById(@Param('id') id: string) {
    return this.tasksServices.deleteTaskById(id);
  }

  @Patch('/:id/status') // This defines a PATCH route for updating a task's status by ID
  updateTaskStatus(
    @Param('id') id: string,
    @Body() UpdateTaskStatusDto: UpdateTaskStatusDto,
  ): ITask {
    const { status } = UpdateTaskStatusDto;
    return this.tasksServices.updateTaskStatus(id, status);
  }
}
