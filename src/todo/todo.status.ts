import { PickType } from '@nestjs/mapped-types';
import { IsIn} from 'class-validator';
import { TodoStatusEnum } from './todo.statusenum';
import { UpdateDto } from './todo.dto';

export class StatusDTO extends PickType(UpdateDto,['status']) {
  @IsIn(['En cours','En attente','Finalisé', ])
  status: TodoStatusEnum;
}