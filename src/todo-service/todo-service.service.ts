import {BadRequestException,NotFoundException, Inject, Injectable } from '@nestjs/common';
import { TodoModel } from '../todo/todo.model';
import { TodoStatusEnum } from '../todo/todo.statusenum';
import { dto1 } from '../todo/todo.dto1';
import { UpdateDto } from '../todo/todo.dto'; 
import { TodoEntity } from '../entities/todoEntity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusDTO } from '../todo/todo.status';
import { SearchDTO } from '../todo/todo.search';
import { pageDTO } from '../todo/todo.page';
import { paginate } from '../todo/todo.paginate';

@Injectable()
export class TodoServiceService {
    
    private todos = [];
   
    getTodos ()
{ 
    console.log('Recuperer la liste des todos');
    return this.todos;
}
constructor(@Inject('uuid') private readonly uuid,
@InjectRepository(TodoEntity)
private readonly todoRepository: Repository<TodoEntity>) {
}


addTodos(body:dto1) 
{ 
    if(body.description == undefined || body.name == undefined){
        return new BadRequestException()
    }
 
    this.todos.push(new TodoModel(this.uuid,body.name,body.description,'waiting'))

}

addTodosDb(element: dto1){
    const todo = new TodoEntity();
    todo.name = element.name ?? "";
    todo.description = element.description ?? "";
    todo.status = TodoStatusEnum.waiting;
    this.todoRepository.save(todo)
    return todo;
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

async deleteByIdDb(id: string){
    const todo = await this.todoRepository.softDelete({id})
    return todo;
}

modifTodo(id:string, body:UpdateDto){
console.log(body);

    const modif = this.getTodoById(id);
    if(!modif ){
        return new NotFoundException()
    }
    const idx = this.todos.indexOf(modif)
    if( body.name ){
        this.todos[idx].name = body.name
    }
    if( body.description){
        this.todos[idx].description = body.description
    }
    if( body.status ){
        this.todos[idx].status = body.status 
    }
    return this.findAll()


}

async modifTodoDb(el: UpdateDto) {
    const element = await this.todoRepository.findOneBy({id: el.id});
    element.description = el.description ?? element.description;
    element.name = el.name ?? element.name;
    element.status = el.status ?? element.status;
    this.todoRepository.save(element)
    return element;
}

restoreById(id: string){
    return this.todoRepository.restore(id);
}

findAll(): TodoModel[] {
    return this.todos;
}

findAllDb() {
    return this.todoRepository.find();
}

async getNBstatus(statuss: StatusDTO){
  return await this.todoRepository.count({where:{status:statuss.status}})
  }


async searchBydescORstatus( search: SearchDTO){
    if(search.critere ==undefined && search.status==undefined){
      return this.getTodos();
    }
    return await this.todoRepository.find({where:[{name:Like("%"+search.critere+"%")},
    {description:Like("%"+search.critere+"%")},{status:search.status}]})
  }

async searchBydescANDstatus(search:SearchDTO,page: pageDTO): Promise<TodoEntity[]>{
    let queryBuilder = this.todoRepository.createQueryBuilder('todo').select('*');
   if(search.critere!=undefined){
    queryBuilder.where("todo.description like :critere ", { critere:`%${search.critere}%`}).orWhere("todo.name like :critere ", { critere:`%${search.critere}%`});
   }
   if(search.status!=undefined){
    queryBuilder.andWhere('todo.status LIKE :sts', { sts: `%${search.status}%` });
   }
   queryBuilder=paginate(queryBuilder,page.page ,page.nb);
   const results = await queryBuilder.getRawMany();
   if(page.page>1 && results.length==0  ) {throw new NotFoundException("pageNotfound");}
    return results;
  }
}
