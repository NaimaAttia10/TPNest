import {BadRequestException,NotFoundException, Inject, Injectable } from '@nestjs/common';
import { TodoModel } from 'src/todo/todo.model';
import { TodoStatusEnum } from 'src/todo/todo.statusenum';
import { dto1 } from 'src/todo/todo.dto1';
import { UpdateDto } from 'src/todo/todo.dto'; 

@Injectable()
export class TodoServiceService {
    private todos = [];
   
    getTodos ()
{ 
    console.log('Recuperer la liste des todos');
    return this.todos;
}
constructor(@Inject('uuid') private readonly uuid) {
}

addTodos(body:dto1) 
{ 
    if(body.description == undefined || body.name == undefined){
        return new BadRequestException()
    }
    
    this.todos.push(new TodoModel(this.uuid,body.name,body.description,'waiting'))

}

getTodoById(id : string){
    const found= this.todos.find(element=>element.id==id);
    if(found == undefined){
        return new NotFoundException()
    }
    return found;
}

deleteTodoById(id:string){
    const removed=this.todos.find(element=>element.id!=id)
    if(removed == undefined){
        return new NotFoundException()
    }
    return this.todos = this.todos.filter(element=> element.id != id)
}

modifTodo(id:string, body:UpdateDto){

    const modif = this.getTodoById(id);
    if(modif == undefined){
        return new NotFoundException()
    }
    if( body.name != undefined){
        this.todos[modif].name = body.name
    }
    if( body.description != undefined){
        this.todos[modif].description = body.description
    }
    if( body.status != undefined){
        this.todos[modif].status = Object.values(TodoStatusEnum)[ Object.keys(TodoStatusEnum).indexOf(body.status)]
    }
    return this.findAll()


}

findAll(): TodoModel[] {
    return this.todos;
}
}
