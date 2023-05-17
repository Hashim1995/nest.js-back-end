import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: () =>
      ` Task status must includes one of them '${Object.values(TaskStatus)}'`,
  })
  status?: TaskStatus;
  search?: string;
}
