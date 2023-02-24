import {Body, Controller, Delete, Get,Param,Post, Put} from '@nestjs/common';
import { UpdateDto } from './todo.dto';
import { dto1 } from './todo.dto1';
import { TodoServiceService } from 'src/todo-service/todo-service.service';

@Controller('todo')
 export class TodoController {
    constructor (private service:TodoServiceService){}
   

    @Get()
getTodos () 
{ 
    return this.service.findAll();

}

@Post()
addTodos(@Body() body: dto1)
{ 
   this.service.addTodos(body);
   return this.service.findAll();
}


@Get ('/:id')
getTodoById(@Param() param){
    return this.service.getTodoById(param.id)
}

@Delete (':id')
deleteTodoById(@Param() param){
  return this.service.deleteTodoById(param.id)
}

@Put(':id')
modifTodo(@Param() param,@Body() body:UpdateDto){
   return this.service.modifTodo(param.id,body)
}
}

