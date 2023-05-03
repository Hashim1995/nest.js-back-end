import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: () =>
      ` Task status must includes one of them "${Object.values(TaskStatus)}"`,
  })
  status?: TaskStatus;
  search?: string;
}
