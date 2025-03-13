import { Injectable } from "@nestjs/common";
import { ITask } from "../model/task.model";
import { CreateTaskDto } from "../dto/create-task.dto";
import { randomInt, randomUUID } from "crypto";
import { UpdateTaskDto } from "../dto/update-task-dto";

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  async findAllTasks() {
    return this.tasks;
  }

  create(createTaskDto: CreateTaskDto) {
    const task: ITask = {
      id: randomInt(1000),
      ...createTaskDto,
    };

    this.tasks.push(task);
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
    }
    console.log(task);
    //console.log(id, updateTaskDto);
  }
}
