import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
} from "@nestjs/common";
import { Request, Response } from "express";
import { TasksService } from "../services/tasks.service";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task-dto";
import { sendResponse } from "src/utils/send-response.utils";
import { send } from "process";

@Controller("tasks")
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  async getAllTasks(@Query("status") status: string,@Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.taskService.findAllTasks(status);
      if(!status){
        sendResponse(res, 200, 'Data fetched successfully...', data);
      }
      sendResponse(res, 200, 'Task filtered successfully...', data);
    } catch (error) {
      throw error;
    }
  }


  @Post()
  async createTasks(
    @Body() createTaskDto: CreateTaskDto,
    @Res() req: Request,
    @Res() res: Response
  ) {
    try {
      const data = await this.taskService.create(createTaskDto);
      sendResponse(res, 201, "Task created successfully...", data);
    }
    catch(error){
      throw error;
    }
  }

  @Get(":id")
  async getTaskById(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try{
      const data = await this.taskService.findById(id);
      sendResponse(res, 200, "Task fetched successfully...", data);
    }
    catch(error){
      throw error;
    }
  }

  @Put(":id")
  async updateTask(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try{
      const data = await this.taskService.update(id, updateTaskDto);
      sendResponse(res, 200, "Task updated successfully...",data);
    }
    catch(error){
      throw error;
    }
  }

  @Delete(":id")
  async deleteTask(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try{
      const data = await this.taskService.delete(id);
      sendResponse(res, 200, "Task deleted successfully...", data);
    }
    catch(error){
      throw error;
    }
  }
}
