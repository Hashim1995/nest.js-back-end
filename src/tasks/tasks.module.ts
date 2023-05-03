import { Module } from '@nestjs/common'; // Import the `Module` decorator from the `@nestjs/common` package
import { TasksRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';

@Module({
  // Define a new Nest.js module with the `@Module` decorator
  imports: [TypeOrmModule.forFeature([TasksRepository])], // Import the `TasksRepository` class and register it as a feature with `TypeOrmModule`
  controllers: [TasksController], // Add the `TasksController` class to the module's controllers array
  providers: [TasksService], // Add the `TasksService` class to the module's providers array
})
export class TasksModule {} // Export the `TasksModule` class for use in other parts of the application
