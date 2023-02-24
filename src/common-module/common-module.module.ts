import { Global, Module } from '@nestjs/common';
import { v4 } from 'uuid';

@Global()
@Module({
providers: [{ provide : 'uuid', useValue : v4() }], 
exports : [{ provide : 'uuid', useValue : v4()}]
})
export class CommonModuleModule {}

  
