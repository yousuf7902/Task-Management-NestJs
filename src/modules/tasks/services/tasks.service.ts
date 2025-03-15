import {  Injectable, NotFoundException } from "@nestjs/common";
import { ITask, TaskStatus } from "../model/task.model";
import { CreateTaskDto } from "../dto/create-task.dto";
import { randomInt } from "crypto";
import { UpdateTaskDto } from "../dto/update-task-dto";
import { WrongTaskStatusException } from "src/exceptions/wrong-task-status-exception";

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  async findAllTasks() {
    return this.tasks;
  }

  async findById(id: number){
    const task = this.tasks.find((task) => task.id === id);
    if(!task){
      throw new NotFoundException("Task not found....");
    }
    return task;
  }

  async filterTask(status:string){
    const tasks = this.tasks.filter((task) => task.status === status);
    if(tasks.length === 0){
      throw new NotFoundException("Task not found....");
    }
    return tasks;
  }

  create(createTaskDto: CreateTaskDto) : ITask {
    const task: ITask = {
      id: randomInt(1000),
      ...createTaskDto,
    };

    this.tasks.push(task);
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskIndex =this.tasks.findIndex((task) => task.id === id);
    if (taskIndex < 0 ) {
       throw new NotFoundException("Task not found...");
    }

    if(updateTaskDto.status && !this.isValidStatus(this.tasks[taskIndex].status, updateTaskDto.status)){
      throw new WrongTaskStatusException();
    }
    
    const updateTask = {...this.tasks[taskIndex], ...updateTaskDto};
    this.tasks[taskIndex]=updateTask;
    return updateTask;
  }

  private isValidStatus(currentStatus: TaskStatus, newStatus: TaskStatus) : boolean {
    const allowedStatus = [
      TaskStatus.OPEN,
      TaskStatus.IN_PROGRESS,
      TaskStatus.DONE
    ];

    return allowedStatus.indexOf(currentStatus)<= allowedStatus.indexOf(newStatus);
  }

  delete(id: number){
    this.tasks =this.tasks.filter((task) => task.id !==id);
    return this.tasks;
  }
}
