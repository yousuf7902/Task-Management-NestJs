import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "../model/task.model";

@Entity('tasks')
export class Task{
    @PrimaryGeneratedColumn()
    taskId: number;

    @Column({type: 'int', nullable: false})
    userId: number;

    @Column({type: 'varchar', nullable: false})
    title:string;

    @Column({type: 'varchar', nullable: false})
    description: string;

    @Column({type: 'enum', enum: TaskStatus, default: TaskStatus.OPEN})
    status: string;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'datetime', default: ()=> 'CURRENT_TIMESTAMP'})
    updatedAt: Date;
}