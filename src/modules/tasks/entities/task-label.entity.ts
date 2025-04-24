import { Column, Entity, Index, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Task } from "./task.entity";

@Entity('task_label')
export class TaskLabel{
    @PrimaryGeneratedColumn()
    labelId: number;

    @Column({type: 'varchar', nullable: false})
    labelName: string;

    @Column({type: 'datetime', default: ()=> 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'datetime', default: ()=> 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @ManyToOne(() => Task, (task) => task.task_labels, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn({name: "taskId", referencedColumnName:"taskId"})
    task: Task;

}   