import { Module } from '@nestjs/common';
import { DirectController } from './direct.controller';
import { DirectService } from './direct.service';
import { RbmqModule } from 'src/rbmq/rbmq.module';
import { EDirect } from 'src/objects/enums/direct.enum';
import { RbmqPublishExchangeService } from 'src/rbmq/rbmqExchange.service';

@Module({
  imports: [
    RbmqModule.register({ queueName: EDirect.DIRECT_QUEUE }),
  ],
  controllers: [DirectController],
  providers: [
    DirectService,
    RbmqPublishExchangeService
  ]
})
export class DirectModule { }
