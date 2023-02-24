import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from './todo/todo.controller';
import { TodoModule } from './todo/todo.module';
import { CommonModuleModule } from './common-module/common-module.module';
import { TodoServiceService } from './todo-service/todo-service.service';

@Module({
  imports: [TodoModule, CommonModuleModule],
  controllers: [AppController,TodoController],
  providers: [AppService, TodoServiceService],
})
export class AppModule {}
