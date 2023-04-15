import { Global, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from '../entities/todoEntity';
import { TodoServiceService } from '../todo-service/todo-service.service';
import { TodoController } from './todo.controller';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature(
            [TodoEntity]
        )
    ],
    controllers:[TodoController],
    providers:[TodoServiceService]
})
export class TodoModule {}
