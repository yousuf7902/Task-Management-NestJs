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
  UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";
import { TasksService } from "../services/tasks.service";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task-dto";
import { sendResponse } from "src/utils/send-response.utils";
import { ApiBearerAuth, ApiQuery} from "@nestjs/swagger";
import { CreateTaskLabelDto } from "../dto/create-task-label.dto";
import { TaskStatus } from "../model/task.model";
import { PaginationParams } from "src/common/pagination/pagination.params";
import { FindTaskParams } from "src/common/pagination/find-task.params";
import { filter } from "rxjs";
import { AuthGuard } from "src/modules/users/auth/auth.guard";
import { GetUser } from "src/common/decorators/user.decorator";

@UseGuards(AuthGuard)
@ApiBearerAuth('JWT-auth')
@Controller("tasks")
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  @ApiQuery({
    name: 'status',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
  })
  @ApiQuery({
    name: 'offset',
    required: false,
  })
  @ApiQuery({
    name: 'search',
    required: false,
  })
  @ApiQuery({
    name: 'labels',
    required: false,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
  })
  async getAllTasks(@Query() filters:  FindTaskParams, @Query() pagination : PaginationParams, @Req() req: Request, @Res() res: Response, @GetUser() user: any) {
    try {
      const data  = await this.taskService.findAllTasks(filters, pagination, user);   

      if(!data) {
        return sendResponse(res, 404, "No task found...");  
      } 

      sendResponse(res, 200, 'All tasked fetched successfully...', data);
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async createTasks(
    @Body() createTaskDto: CreateTaskDto,
    @Res() req: Request,
    @Res() res: Response,
    @GetUser() user: any
  ) {
    try {
      const data = await this.taskService.create(createTaskDto, user);
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
    @Res() res: Response,
    @GetUser() user: any  
  ) {
    try{
      const data = await this.taskService.update(id, updateTaskDto, user);
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

  @Get(":id/labels")
  async getAllLabels (@Param("id", ParseIntPipe) id: number, @Req() req: Request, @Res() res: Response){
    try{
      const data = await this.taskService.getAllLabels(id);
      sendResponse(res, 200, "Labels are fetched successfully...", data);
    }
    catch(error){
      throw error;
    }
  }

  @Post(':id/add-labels')
  async createLabels(@Param("id", ParseIntPipe) id: number,@Body() createTaskLabelDto: CreateTaskLabelDto, @Req() req: Request, @Res() res: Response){
    try{
      const data = await this.taskService.addLabels(id, createTaskLabelDto);
      sendResponse(res, 201, "Task Labels added successfully...", data);
    }
    catch(error){
      throw error;
    }
  }

  @Delete(":id/:labelId")
  async deleteLabels(@Param('id', ParseIntPipe) id: number, @Param('labelId', ParseIntPipe) labelId: number, @Req() req: Request, @Res() res: Response){
    try{
      const data = await this.taskService.deleteTaskLabels(id, labelId);
      sendResponse(res, 200, "Task-label deleted successfully...", data);
    }
    catch(error){ 
      throw error;
    }
  }

}
