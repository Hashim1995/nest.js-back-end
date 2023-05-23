import { Module } from '@nestjs/common'; // Import the Module decorator from the @nestjs/common module.
import { TasksModule } from './tasks/tasks.module'; // Import the TasksModule from the './tasks/tasks.module' file.
import { TypeOrmModule } from '@nestjs/typeorm'; // Import the TypeOrmModule from the @nestjs/typeorm module.
import { Task } from './tasks/task.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  // Define a new Nest.js module using the @Module decorator.
  imports: [
    // Import the TasksModule and the TypeOrmModule into the module.
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // Set the database type to Postgres.
      host: 'localhost', // Set the database host to 'localhost'.
      port: 5432, // Set the database port to 5432.
      username: 'postgres', // Set the database username to 'postgres'.
      password: 'postgres', // Set the database password to 'postgres'.
      database: 'task-managment', // Set the database name to 'task-managment'.
      autoLoadEntities: true, // Automatically load entities from the application directory.
      synchronize: true, // Automatically synchronize the database schema with the entities.
    }),
    AuthModule,
  ],
})
export class AppModule {} // Export the AppModule class.
