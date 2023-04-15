import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from './todo/todo.controller';
import { TodoModule } from './todo/todo.module';
import { CommonModuleModule } from './common-module/common-module.module';
import { TodoServiceService } from './todo-service/todo-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './auth/auth.middleware';
import { UserModule } from './user/user.module';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';

@Module({
  imports: [TodoModule, CommonModuleModule,TypeOrmModule.forRoot(
    {
    type: 'mysql',
    host: "127.0.0.1" ,
    port: 3306,
    username: "root",
    password: "",
    database: "mydb",
    autoLoadEntities:true,
    synchronize: true,
    logging: true
    }
    ), UserModule, CvModule, SkillModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthMiddleware).forRoutes(
          {method:RequestMethod.POST,path:'todo*',version:'1'},
          {method:RequestMethod.PUT,path:'todo*',version:'1'},
          {method:RequestMethod.PATCH,path:'todo*',version:'1'},
          {method:RequestMethod.DELETE,path:'todo*',version:'1'}
      );
  }}
