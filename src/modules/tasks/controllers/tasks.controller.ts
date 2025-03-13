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
  createTasks(@Body() createTaskDto:CreateTaskDto ,@Res() req: Request, @Res() res: Response) {
    const data = this.taskService.create(createTaskDto);
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
  ) {}

  @Get(":id")
  async getTaskById(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response
  ) {}

  @Put(":id")
  async updateTask(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const data = this.taskService.update(id, updateTaskDto);
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
  ) {}
}
