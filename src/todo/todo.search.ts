import { IsEnum, IsOptional } from "class-validator";
import { TodoStatusEnum } from "./todo.statusenum";

export class SearchDTO {
    @IsOptional()
    critere: string;
    @IsOptional()
    @IsEnum(TodoStatusEnum)
    status: TodoStatusEnum;
}