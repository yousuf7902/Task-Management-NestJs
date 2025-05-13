import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
    private readonly saltRounds: number = 10; // Number of rounds for bcrypt hashing
    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }

    async verify(plainPassword:string, hashPassword : string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashPassword);   
    }
}
