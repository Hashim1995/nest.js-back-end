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

@Controller('tasks')
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): ITask[] {
    // if we have any filters defined, call taskService.getTasksWithFilters
    // otherwise, just get all tasks
    if (Object.keys(filterDto).length) {
      //
      return this.tasksServices.getTasksWithFilters(filterDto);
    } else {
      return this.tasksServices.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksServices.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): ITask {
    return this.tasksServices.createTask(createTaskDto);
  }

  @Delete()
  deleteAllTasks() {
    return this.tasksServices.deleteAllTasks();
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string) {
    return this.tasksServices.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() UpdateTaskStatusDto: UpdateTaskStatusDto,
  ): ITask {
    const { status } = UpdateTaskStatusDto;
    return this.tasksServices.updateTaskStatus(id, status);
  }
}
