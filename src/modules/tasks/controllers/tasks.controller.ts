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

@Controller("tasks")
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  async getAllTasks(@Req() req: Request, @Res() res: Response) {
    const data = await this.taskService.findAllTasks();
    res.status(200).json({
      statusCode: 200,
      message: "Success",
      data: data,
    });
  }

  @Post()
  async createTasks(@Body() createTaskDto:CreateTaskDto ,@Res() req: Request, @Res() res: Response) {
    const data = await this.taskService.create(createTaskDto);
    res.status(201).json({
        statusCode: 201, 
        message: "Task created successfully...",
        data: data
    })
  }

  @Get()
  async filterTask(
    @Query("status") status: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const data = await this.taskService.filterTask(status);
    return res.status(200).json({
        statusCode: 200,
        message: "Task filltered successfully...",
        data:data
    })
  }

  @Get(":id")
  async getTaskById(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const data = await this.taskService.findById(id);
    return res.status(200).json({
        statusCode: 200,
        message: "Task fetched successfully...",
        data:data
    })
  }

  @Put(":id")
  async updateTask(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const data = await this.taskService.update(id, updateTaskDto);
    return res.status(200).json({
        statusCode: 200, 
        message: "Task updated successfully...",
        data: data
    })
  }

  @Delete(":id")
  async deleteTask(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const data = await this.taskService.delete(id);
    return res.status(200).json({
      statusCode: 200,
      message: "Task deleted successfully...",
      data:data
    })
  }
}
