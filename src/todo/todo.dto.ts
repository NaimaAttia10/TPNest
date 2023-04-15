import {IsIn, IsString, MaxLength, MinLength } from "class-validator"
import { errors } from "./errors"
import { TodoStatusEnum } from "./todo.statusenum"

export class UpdateDto{
    id:string
    @IsString({message:errors.IsNotStringError})
    @MinLength(3,{message:errors.MinThreeError})
    @MaxLength(10,{message:errors.MaxTenError})
    name:string
    @IsString({message:errors.IsNotStringError})
    @MinLength(10,{message:errors.MinTenError})
    description:string
    @IsIn([TodoStatusEnum.actif,TodoStatusEnum.done,TodoStatusEnum.waiting],{message:errors.NotInError})
    status:TodoStatusEnum
}