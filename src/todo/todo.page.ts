import { PickType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString, Length, MinLength, isInt } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateDto } from './todo.dto';


export class pageDTO extends PickType (UpdateDto,['status']) {
  @IsOptional()
  @Type(() => Number )
  @IsNumber()
  page:number;
  
  @IsOptional()
  @Type(() => Number )
  @IsNumber()
  nb: number;
}