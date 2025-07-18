import { Module } from '@nestjs/common';
import { HeadersController } from './headers.controller';
import { HeadersService } from './headers.service';
import { RbmqModule } from 'src/rbmq/rbmq.module';
import { EHeaders } from 'src/objects/enums/headers.enum';

@Module({
  imports: [
    RbmqModule.register({ queueName: EHeaders.HEADERS_QUEUE}),
  ],
  controllers: [HeadersController],
  providers: [HeadersService]
})
export class HeadersModule {}
