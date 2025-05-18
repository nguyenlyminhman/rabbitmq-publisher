import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EDirect } from 'src/objects/enums/direct.enum';
import { RbmqPublishExchangeService } from 'src/rbmq/rbmqExchange.service';

@Injectable()
export class DirectService {
    // constructor(@Inject('RABBITMQ_SERVICE') private rabbitClient: ClientProxy) {}

    constructor(
        @Inject(EDirect.DIRECT_QUEUE) private rmq: ClientProxy,

        private readonly rmqPublishExchange: RbmqPublishExchangeService
    ) { }

    async pushExchange() {
        try {
            return this.rmqPublishExchange.publishToDirect('drex_queue', '', { msg: 'hello world from ' + EDirect.DIRECT_QUEUE })
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    async pushMsgQ1() {
        try {
            return this.rmq.emit(EDirect.DIRECT_PATTERN_01, { msg: 'hello world from ' + EDirect.DIRECT_PATTERN_01 })
        } catch (err) {
            console.log(EDirect.DIRECT_PATTERN_01 + ' errors:', err);
            throw new BadRequestException(err);
        }
    }

    async pushMsgQ2() {
        try {
            return this.rmq.emit(EDirect.DIRECT_PATTERN_02, { msg: 'hello world from ' + EDirect.DIRECT_PATTERN_02 })
        } catch (err) {
            console.log(EDirect.DIRECT_PATTERN_02 + ' errors:', err);
            throw new BadRequestException(err);
        }
    }
}
