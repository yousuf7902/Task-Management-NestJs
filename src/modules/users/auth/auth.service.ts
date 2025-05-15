import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { PasswordService } from '../password/password.service';
import { error } from 'console';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService : UsersService,
        private readonly jwtService: JwtService,
        private readonly passwordService: PasswordService,
    ){}

    async registerUser(createUserDto: CreateUserDto){
        try{
            const isExist = await this.userService.findOneByEmail(createUserDto.email);

            if(isExist){
                throw new Error("User already exists...");
            }

            const user = await this.userService.userCreate(createUserDto);

            return user;
        }
        catch(error){
            throw error;
        }
    }

    private async generateToken(user:User){
        const payload = {userId: user.userId, name: user.name};
        const token = this.jwtService.sign(payload,  {
            secret: process.env.JWT_SECRET_KEY,
          }); 
        return "Bearer " + token;   
    }

    public async loginUser(email: string, password:string){
        try{
            const user = await this.userService.findOneByEmail(email);
            
            if(!user){
                throw new Error("User not found...");
            }
            
            const isPasswordValid = await this.passwordService.verify(password, user.password);

            if(!isPasswordValid){
                throw new BadRequestException("Invalid password...");
            }

            const token = await this.generateToken(user);
            return token;
        }
        catch(error){
            throw error;
        }
    }
}


// 1. User Registration
// - Make sure does not exist yet
// - store the user in the database
// - hash the password before storing it in the database
// 2. Generating JWT Token
