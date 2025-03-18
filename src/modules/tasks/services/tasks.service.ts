import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task-dto";
import { WrongTaskStatusException } from "src/exceptions/wrong-task-status-exception";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "../entities/task.entity";
import { Repository } from "typeorm";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>
  ) {}

  async findAllTasks(status: string) {
    try {
      if (!status) {
        const data = await this.taskRepository.find();
        return data;
      }
      const tasks = await this.taskRepository.findBy({ status: status });
      if (tasks.length === 0) {
        throw new NotFoundException("Task not found....");
      }
      return tasks;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number) {
    try {
      const task = await this.taskRepository.findOneBy({ taskId: id });
      if (!task) {
        throw new NotFoundException("Task not found....");
      }
      return task;
    } catch (error) {
      throw error;
    }
  }

  async create(createTaskDto: CreateTaskDto) {
    try {
      const task = this.taskRepository.create(createTaskDto);
      await this.taskRepository.save(task);
      return task;

    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const data = await this.taskRepository.findOneBy({ taskId: id });

      if (!data) {
        throw new NotFoundException("Task not found...");
      }

      if (
        updateTaskDto.status &&
        !this.isValidStatus(data.status, updateTaskDto.status)
      ) {
        throw new WrongTaskStatusException();
      }

      const updateTask = await this.taskRepository.save({
        ...data,
        ...updateTaskDto,
      });

      return updateTask;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const data = await this.taskRepository.findOneBy({ taskId: id });
      if (!data) {
        throw new NotFoundException();
      }
      return this.taskRepository.delete({ taskId: id });
    } catch (error) {
      throw error;
    }
  }

  private isValidStatus(currentStatus: string, newStatus: string): boolean {
    try {
      const allowedStatus = [
        "OPEN",
        "IN_PROGRESS",
        "DONE",
      ];

      return (
        allowedStatus.indexOf(currentStatus) <= allowedStatus.indexOf(newStatus)
      );
    } catch (error) {
      throw error;
    }
  }
}
