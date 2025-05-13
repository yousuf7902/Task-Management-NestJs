import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { PasswordService } from '../password/password.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>,
        private readonly passwordService: PasswordService,
    ) {}
   

    //1. find user by email
    //2. create user
    //3. fetch the user by id

    public async findOneByEmail(email:string){
        try{
            const user = await this.userRepository.findOneBy({email});
            return user;
        }
        catch(error){
            throw error;
        }
    }

    public async userCreate(createUserDto: CreateUserDto){
        try{
            const {password} = createUserDto;
            const hashedPassword = await this.passwordService.hashPassword(password);
            const user = this.userRepository.create({...createUserDto, password: hashedPassword});

            return await this.userRepository.save(user);
        }
        catch(error){
            throw error;
        }
    }

    public async findOneById(id: number){
        try{
            const user = await this.userRepository.findOneBy({userId: id});
            return user;
        }
        catch(error){
            throw error;
        }
    }

}
