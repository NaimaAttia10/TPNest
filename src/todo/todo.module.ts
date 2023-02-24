import { Global, Module } from '@nestjs/common';
import { TodoServiceService } from 'src/todo-service/todo-service.service';
import { TodoController } from './todo.controller';

@Global()
@Module({
    controllers:[TodoController],
    providers:[TodoServiceService]
})
export class TodoModule {}