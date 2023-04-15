import { TodoStatusEnum } from "../todo/todo.statusenum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('todo')
export class TodoEntity{
    @PrimaryGeneratedColumn()
    id:string
   
    @Column({type: "varchar"})
    name: string;

    @Column({type: "varchar"})
    description: string;

    @CreateDateColumn({update: false})
    creationDate: Date;

    @Column({
        type: "enum",
        enum: TodoStatusEnum,
        default: TodoStatusEnum.waiting
    })
    status: TodoStatusEnum;

    @DeleteDateColumn()
    deletedAt: Date;

    @UpdateDateColumn()
    updatedAt: Date; 
}
    

