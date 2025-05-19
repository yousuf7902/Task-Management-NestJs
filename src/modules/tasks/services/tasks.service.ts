import { TaskLabel } from "./../entities/task-label.entity";
import { CreateTaskLabelDto } from "./../dto/create-task-label.dto";
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  Search,
} from "@nestjs/common";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task-dto";
import { WrongTaskStatusException } from "src/exceptions/wrong-task-status-exception";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "../entities/task.entity";
import { FindOptionsWhere, Like, Repository } from "typeorm";
import { PaginationParams } from "src/common/pagination/pagination.params";
import { FindTaskParams } from "src/common/pagination/find-task.params";
import { filter } from "rxjs";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(TaskLabel)
    private taskLabelRepository: Repository<TaskLabel>
  ) {}

  async findAllTasks(
    filters: FindTaskParams,
    pagination?: PaginationParams,
    user?: any
  ) {
    try {
      if (
        !filters.status &&
        !filters.search?.trim() &&
        !filters.labels?.length
      ) {
        console.log("No filters provided");
        const tasks = await this.taskRepository.find({
          skip: pagination?.offset,
          take: pagination?.limit,
          where: { userId: user.userId },
        });

        if (tasks.length === 0) {
          throw new NotFoundException("Task not found....");
        }

        return {
          data: [tasks],
          meta: {
            total: tasks.length,
            ...pagination,
          },
        };
      }

      const query = this.taskRepository
        .createQueryBuilder("tasks")
        .leftJoinAndSelect("tasks.task_labels", "labels")
        .where('tasks.userId = :userId', { userId: user.userId });

      if (filters.status) {
        query.andWhere("tasks.status = :status", {
          status: filters.status,
        });
      }

      if (filters.search) {
        query.andWhere(
          "(tasks.title LIKE :search OR tasks.description LIKE :search)",
          { search: `%${filters.search}%` }
        );
      }

      if (filters.labels?.length) {
        const subQuery = query
          .subQuery()
          .select("labels.taskId")
          .from("task_label", "labels")
          .where("labels.labelName IN (:...names)", { names: filters.labels })
          .getQuery();

        query.andWhere(`tasks.taskId IN ${subQuery}`);

        // query.andWhere("labels.labelName IN (:...names)", {
        //   names: filters.labels
        // });
      }

      // query.andWhere(`tasks.userId`, user.userId);
      query.orderBy(`tasks.${filters.sortBy}`, filters.sortOrder);

      query.skip(pagination?.offset).take(pagination?.limit);

      const tasks = await query.getManyAndCount();

      if (tasks[1] === 0) {
        throw new NotFoundException("Task not found....");
      }

      return query.getManyAndCount();

      // let where: FindOptionsWhere<Task> | FindOptionsWhere<Task>[] = {};

      // if(filters.status){
      //   where.status = filters.status;
      // }

      // if(filters.search){
      //   where = [
      //     { ...where, title: Like(`%${filters.search}%`) },
      //     { ...where, description: Like(`%${filters.search}%`) }
      //   ];
      // }

      // const tasks = await this.taskRepository.find({ where , skip: pagination?.offset, take: pagination?.limit});

      // if (tasks.length === 0) {
      //   throw new NotFoundException("Task not found....");
      // }

      // return {
      //   data: [tasks],
      //   meta: {
      //     total: tasks.length,
      //     ...pagination,
      //   }
      // };
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

  async create(createTaskDto: CreateTaskDto, user: any) {
    try {
      const { taskLabels, ...taskData } = createTaskDto;
      const uniqueLabels = [...(new Set(taskLabels) || [])];
      const newTask = await this.taskRepository.create({
        ...taskData,
        userId: user.userId,
      });
      const savedTask = await this.taskRepository.save(newTask);

      if (uniqueLabels && uniqueLabels.length > 0) {
        const taskLabels = uniqueLabels.map((labelName) => {
          return this.taskLabelRepository.create({
            labelName,
            task: savedTask,
          });
        });

        await this.taskLabelRepository.save(taskLabels);
      }
      return { task: savedTask, labels: uniqueLabels || [] };
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, user: any) {
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

      this.checkOwnerShip(data, data.userId);
      
      updateTaskDto.userId = user.userId;
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

      this.checkOwnerShip(data, data.userId); 

      return this.taskRepository.delete({ taskId: id });
    } catch (error) {
      throw error;
    }
  }

  //   // Task Labels Codes
  async getAllLabels(id: number) {
    try {
      const allLabels = await this.taskRepository.findOne({
        where: { taskId: id },
      });

      if (!allLabels?.task_labels || allLabels?.task_labels.length === 0) {
        throw new NotFoundException("Task labels are not found....");
      }

      return allLabels.task_labels;
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

      const isExistLabel = task.task_labels.some(
        (label) => label.labelName === createTaskLabelDto.labelName
      );

      if (isExistLabel) {
        throw new BadRequestException("Task labels already exists...");
      }

      const saveLabels = await this.taskLabelRepository.save({
        labelName: createTaskLabelDto.labelName,
        task: task,
      });

      return saveLabels;
    } catch (error) {
      throw error;
    }
  }

  async deleteTaskLabels(id: number, labelId: number) {
    try {
      const taskLabel = await this.taskLabelRepository.findOne({
        where: {
          labelId: labelId,
          task: { taskId: id },
        },
      });

      if (!taskLabel) {
        throw new NotFoundException("Task label is not exists....");
      }

      this.checkOwnerShip(taskLabel.task, taskLabel.task.userId);
      
      return await this.taskLabelRepository.delete(taskLabel);
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

  private checkOwnerShip ( task: Task , user: any){
    if(task.userId !== user.userId){
      throw new ForbiddenException("You are not the owner of this task");
    }
  }

}
