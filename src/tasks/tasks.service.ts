import { Injectable, NotFoundException } from '@nestjs/common'; // Import the Injectable decorator and the NotFoundException exception from the @nestjs/common module.
import { ITask, TaskStatus } from './tasks.model'; // Import the ITask interface and the TaskStatus enum from the './tasks.model' file.
import { v4 as uuid } from 'uuid'; // Import the v4 function from the uuid module to generate unique IDs.
import { CreateTaskDto } from './dto/create-task.dto'; // Import the CreateTaskDto class from the './dto/create-task.dto' file.
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'; // Import the GetTasksFilterDto class from the './dto/get-tasks-filter.dto' file.

@Injectable() // Decorate the TasksService class as an injectable provider.
export class TasksService {
  private tasks: ITask[] = []; // Define a private tasks property as an array of ITask objects.

  getAllTasks(): ITask[] {
    // Define a public method called getAllTasks that returns an array of ITask objects.
    return this.tasks; // Return the tasks property.
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): ITask[] {
    // Define a public method called getTasksWithFilters that takes a GetTasksFilterDto object as input and returns an array of ITask objects.
    const { status, search } = filterDto; // Destructure the filterDto object to get the status and search properties.
    let tasks = this.tasks; // Assign the tasks property to a new tasks variable.
    if (status) {
      // If a status property was provided in the filterDto object...
      tasks = tasks.filter((item: ITask) => item.status === status); // ...filter the tasks array to only include tasks with a matching status property.
    }
    if (search) {
      // If a search property was provided in the filterDto object...
      tasks = tasks.filter((item) => {
        // ...filter the tasks array based on whether the search string is included in the title or description properties of the tasks.
        if (item.title.includes(search) || item.description.includes(search)) {
          return true;
        } else {
          return false;
        }
      });
    }
    return tasks; // Return the filtered tasks array.
  }

  createTask(createTaskDto: CreateTaskDto): ITask {
    // Define a public method called createTask that takes a CreateTaskDto object as input and returns an ITask object.
    const { title, description } = createTaskDto; // Destructure the createTaskDto object to get the title and description properties.
    const task: ITask = {
      // Define a new task object with the provided title and description, a generated unique ID, and a default status of TaskStatus.OPEN.
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task); // Add the new task object to the tasks array.
    return task; // Return the new task object.
  }

  deleteAllTasks(): string {
    // Define a public method called deleteAllTasks that deletes all tasks and returns a string.
    this.tasks.length = 0; // Set the length of the tasks array to 0 to remove all tasks.
    return 'all tasks removed'; // Return a message indicating that all tasks were removed.
  }

  getTaskById(id: string): ITask {
    // Define a public method called getTaskById that takes a string ID as input and returns an ITask object.
    const res = this.tasks.find((task) => task.id === id); // Search the tasks

    if (res) {
      return res;
    } else {
      throw new NotFoundException([`Task with ID:'${id}' not found`]);
    }
  }
  deleteTaskById(id: string): string {
    const found = this.getTaskById(id);
    if (found) {
      this.tasks.filter((item) => item.id !== found?.id);
      return `${id} task has been removed`;
    } else {
      throw new NotFoundException([`Task with ID:'${id}' not found`]);
    }
  }
  updateTaskStatus(id: string, status: TaskStatus) {
    const found = this.getTaskById(id);
    if (found) {
      found.status = status;
      return found;
    } else {
      throw new NotFoundException([`Task with ID:'${id}' not found`]);
    }
  }
}
