import { TaskLabel } from './../entities/task-label.entity';
import { CreateTaskLabelDto } from './../dto/create-task-label.dto';
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task-dto";
import { WrongTaskStatusException } from "src/exceptions/wrong-task-status-exception";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "../entities/task.entity";
import { FindOptionsWhere, Like, Repository } from "typeorm";
import { PaginationParams } from 'src/common/pagination/pagination.params';
import { FindTaskParams } from 'src/common/pagination/find-task.params';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(TaskLabel) private taskLabelRepository: Repository<TaskLabel>
  ) {}

  async findAllTasks(filters: FindTaskParams, pagination?: PaginationParams) {
    try {

      if (!filters.status && !filters.search?.trim()) {
        const tasks = await this.taskRepository.find({skip: pagination?.offset, take: pagination?.limit});

        if(tasks.length === 0) {
          throw new NotFoundException("Task not found....");
        }

        return {
          data: [tasks],
          meta: {
            total: tasks.length,
            ...pagination,
          }
        }
      }

      let where: FindOptionsWhere<Task> | FindOptionsWhere<Task>[] = {};

      if(filters.status){
        where.status = filters.status;
      }

      if(filters.search){
        where = [
          { ...where, title: Like(`%${filters.search}%`) },
          { ...where, description: Like(`%${filters.search}%`) }
        ];
      }

      const tasks = await this.taskRepository.find({ where , skip: pagination?.offset, take: pagination?.limit});

      if (tasks.length === 0) {
        throw new NotFoundException("Task not found....");
      }

      return {
        data: [tasks],
        meta: {
          total: tasks.length,
          ...pagination,
        }
      };

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
      const {taskLabels, ...taskData } = createTaskDto;
      const uniqueLabels = [...new Set(taskLabels) || []];
      const newTask = await this.taskRepository.create(taskData);
      const savedTask = await this.taskRepository.save(newTask);

      if(uniqueLabels && uniqueLabels.length>0){
        const taskLabels = uniqueLabels.map(labelName => {
          return this.taskLabelRepository.create({
            labelName,
            task: savedTask,
          });
        });

        await this.taskLabelRepository.save(taskLabels);
      }
      return {task: savedTask, labels : uniqueLabels || []}
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
  
//   // Task Labels Codes
  async getAllLabels(id: number){
    try{
      const allLabels = await this.taskRepository.findOne({
        where: {taskId: id}});

        if(!allLabels?.task_labels || allLabels?.task_labels.length === 0){
          throw new NotFoundException("Task labels are not found....");
        }

      return allLabels.task_labels;
    }
    catch(error){
      throw error;
    }
  }

  async addLabels(id: number, createTaskLabelDto:CreateTaskLabelDto){
    try{
      const task = await this.taskRepository.findOneBy({taskId:id});
      if(!task){
        throw new NotFoundException("Task is not found");
      }
      
      const isExistLabel = task.task_labels.some((label) => label.labelName === createTaskLabelDto.labelName);

      if(isExistLabel){
        throw new BadRequestException("Task labels already exists...");
      }
  
      const saveLabels = await this.taskLabelRepository.save({
        labelName: createTaskLabelDto.labelName,
        task: task,
      })
  
      return saveLabels;
    }
    catch(error){
      throw error;
    }
  }

  async deleteTaskLabels(id: number, labelId : number){
    try{
      const taskLabel = await this.taskLabelRepository.findOne({
        where: {
          labelId: labelId,
          task: { taskId: id },
        },
      });

      if(!taskLabel){
        throw new NotFoundException("Task label is not exists....")
      }
  
      return await this.taskLabelRepository.delete(taskLabel);
    }
    catch(error){
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
