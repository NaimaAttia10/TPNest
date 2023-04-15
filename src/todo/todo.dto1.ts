import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"
import { errors } from "./errors"

export class dto1{
   @IsString({message:errors.IsNotStringError})
    @IsNotEmpty({message:errors.EmptyError})
    @MinLength(3,{message:errors.MinThreeError})
    @MaxLength(10,{message:errors.MaxTenError})
    name:string
   @IsString({message:errors.IsNotStringError})
   @IsNotEmpty({message:errors.EmptyError})
   @MinLength(10,{message:errors.MinTenError})
    description:string
}                       