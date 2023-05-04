import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus, { message: 'This Task status is not excist' })
  status: TaskStatus;
}
