import { Expose } from "class-transformer";
import { Task } from "src/modules/tasks/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../role.enum";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    @Expose()
    userId: number;

    @Column({type: 'varchar', nullable: false})
    @Expose()
    name: string;

    @Column({type: 'varchar', nullable: false})
    @Expose()
    email: string;

    @Column({type: 'varchar', nullable: false})
    password: string;   

    @Column({type: "enum", enum: Role, array: true, default: Role.USER})
    @Expose( )
    roles: Role [];

    @Column({type:'datetime', default : () => 'CURRENT_TIMESTAMP'})
    @Expose()
    createdAt: Date;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    @Expose()
    updatedAt: Date; 
} 