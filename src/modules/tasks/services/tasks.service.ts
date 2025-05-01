import { CreateTaskLabelDto } from "./../dto/create-task-label.dto";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task-dto";
import { WrongTaskStatusException } from "src/exceptions/wrong-task-status-exception";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "../entities/task.entity";
import { Repository } from "typeorm";
import { TaskLabel } from "../entities/task-label.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(TaskLabel)
    private taskLabelRepository: Repository<TaskLabel>
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
      const { taskLabels, ...taskData } = createTaskDto;
      const uniqueLabels = [...(new Set(taskLabels) || [])];
      const newTask = await this.taskRepository.create(taskData);
      const savedTask = await this.taskRepository.save(newTask);

      if (uniqueLabels && uniqueLabels.length > 0) {
        const taskLabelsInsert = uniqueLabels.map((labelName) => ({
          taskId: savedTask.taskId,
          labelName,
        }));

        await this.taskLabelRepository.insert(taskLabelsInsert);
      }
      return { task: savedTask, labels: uniqueLabels || [] };
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

  // Task Labels Codes
  async getAllLabels(id: number) {
    try {
      const allLabels = await this.taskLabelRepository.find({
        where: { taskId: id },
      });

      if (!allLabels) {
        throw new NotFoundException("Label are not found for this task...");
      }

      return allLabels;
    } catch (error) {
      throw error;
    }
  }

  async addLabels(id: number, createTaskLabelDto: CreateTaskLabelDto) {
    try {
      const task = await this.taskRepository.findOneBy({ taskId: id });
      if (!task) {
        throw new NotFoundException("Task is not found");
      }
      const labels = await this.taskLabelRepository.find({
        where: { taskId: id },
      });
      const isExistLabel = labels.some(
        (label) => label.labelName === createTaskLabelDto.labelName
      );
      if (isExistLabel) {
        throw new BadRequestException("Task labels already exists...");
      }

      const saveLabels = await this.taskLabelRepository.save({
        ...createTaskLabelDto,
        taskId: id,
      });

      return saveLabels;
    } catch (error) {
      throw error;
    }
  }

  async deleteTaskLabels(id: number, labelId: number) {
    try {
      const taskLabel = await this.taskLabelRepository.findOne({
        where: { taskId: id, labelId: labelId },
      });

      if (!taskLabel) {
        throw new NotFoundException("Task label is not exists....");
      }

      return await this.taskLabelRepository.delete({
        taskId: id,
        labelId: labelId,
      });
    } catch (error) {
      throw error;
    }
  }

  private isValidStatus(currentStatus: string, newStatus: string): boolean {
    try {
      const allowedStatus = ["OPEN", "IN_PROGRESS", "DONE"];

      return (
        allowedStatus.indexOf(currentStatus) <= allowedStatus.indexOf(newStatus)
      );
    } catch (error) {
      throw error;
    }
  }
}
