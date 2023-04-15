import { Body, Controller, Delete, Get,Param,Post, Put, Query, UsePipes, ValidationPipe, Version} from '@nestjs/common';
import { UpdateDto } from './todo.dto';
import { dto1 } from './todo.dto1';
import { TodoServiceService } from '../todo-service/todo-service.service';
import { SearchDTO } from './todo.search';
import { pageDTO } from './todo.page';
import { StatusDTO } from './todo.status';

@Controller('todo')
 export class TodoController {
    constructor (private service:TodoServiceService){}
   
@Get()
@Version("1")
getTodos () 
{ 
    return this.service.findAll();

}

@Post()
@Version("1")
@UsePipes(ValidationPipe)
addTodos(@Body() body: dto1)
{ 
   this.service.addTodos(body);
   return this.service.findAll();
}

@Post()
@Version("2")
@UsePipes(ValidationPipe)
addTodosDb(@Body() body: dto1)
{ 
   this.service.addTodosDb(body);
   return this.service.findAllDb();
}

@Get ('/:id')
getTodoById(@Param() param){
    return this.service.getTodoById(param.id)
}


@Delete (':id')
@Version("1")
deleteTodoById(@Param() param){
  return this.service.deleteTodoById(param.id)
}

@Delete (':id')
@Version("2")
deleteByIdDb(@Param() param){
  return this.service.deleteTodoById(param.id)
}


@Put(':id')
@Version("1")
@UsePipes(ValidationPipe)
modifTodo(@Param() param,@Body() body:UpdateDto){
   return this.service.modifTodo(param.id,body)
}

@Put(':id')
@Version("2")
@UsePipes(ValidationPipe)
modifTodoDb(@Param() param,@Body() body:UpdateDto){
   return this.service.modifTodo(param.id,body)
}

@Get()
@Version("2")
getTodosV2(@Query() search: SearchDTO ,@Query() page: pageDTO) {
  return this.service.searchBydescANDstatus(search,page);
}

@Get('/status')
getnbstatus(@Body() status: StatusDTO) {
 return this.service.getNBstatus(status);
}

@Get("/search")
searchBydes(@Query() search: SearchDTO){
  return this.service.searchBydescORstatus(search);
}

}

