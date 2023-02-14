import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus, { message: 'This Task status is not excist' })
  status: TaskStatus;
}
