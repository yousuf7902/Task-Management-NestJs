import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('task_label')
export class TaskLabel{
    @PrimaryGeneratedColumn()
    labelId: number;

    @Column({type: 'varchar', nullable: false})
    labelName: string;

    @Column({type: 'int', nullable: false})
    taskId: number;

    @Column({type: 'datetime', default: ()=> 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'datetime', default: ()=> 'CURRENT_TIMESTAMP'})
    updatedAt: Date;


}