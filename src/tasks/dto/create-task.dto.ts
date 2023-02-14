import { IsNotEmpty } from 'class-validator';
export class CreateTaskDto {
  @IsNotEmpty({ message: 'Task title is required' })
  title: string;
  @IsNotEmpty({ message: 'Task description is required' })
  description: string;
}
