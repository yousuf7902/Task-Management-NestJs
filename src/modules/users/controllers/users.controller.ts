import { CreateUserDto } from './../dto/create-user.dto';
import { Controller, Get, Param, ParseIntPipe, Post, Req, Res } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { sendResponse } from 'src/utils/send-response.utils';
import { Request, Response } from 'express';
import { send } from 'process';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Get(":email")
    async getUserByEmail(@Req() req: Request, @Res() res: Response, @Param("email") email: string){
        try{
            const data = await this.userService.findOneByEmail(email);

            if(!data){
                return sendResponse(res,  404 , "User not found...")
            }
            sendResponse(res, 200, "User found...", data);
        }
        catch(error){
            throw error;
        }
    }

    @Post("create")
    async createUser(@Req() req: Request, @Res() res: Response, createUserDto: CreateUserDto){
        try{
            const data = await this.userService.userCreate(createUserDto);
            if(!data){
                return sendResponse(res,  404 , "User not created...")
            }
            sendResponse(res, 200, "User created...", data);
        }
        catch(error){
            throw error;
        }
    }

    @Get(":id")
    async getUserById(@Req() req: Request, @Res() res: Response, @Param("id", ParseIntPipe) id:number){
        try{
            const data = await this.userService.findOneById(id);

            if(!data){
                return sendResponse(res,  404 , "User not found...")
            }
            sendResponse(res, 200, "User found...", data);
        }
        catch(error){
            throw error;
        }
    }




}
