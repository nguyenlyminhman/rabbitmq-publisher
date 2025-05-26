import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EDirect } from 'src/objects/enums/direct.enum';
import { EDirectRtk } from 'src/objects/exchange/directEx.queue';
import { RbmqPublishExchangeService } from 'src/rbmq/rbmqExchange.service';

@Injectable()
export class DirectService {
    // constructor(@Inject('RABBITMQ_SERVICE') private rabbitClient: ClientProxy) {}

    constructor(
        @Inject(EDirect.DIRECT_QUEUE) private rmq: ClientProxy,

        private readonly rmqPublishExchange: RbmqPublishExchangeService
    ) { }

    async pushExchangeRtk01() {
        try {
            const rtk = EDirectRtk.rtk_01;
            return this.rmqPublishExchange.publishToDirect(rtk, { msg: 'Hello world from Rtk 01', yoho: 'ecec'})
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    async pushExchangeRtk02() {
        try {
            const rtk = EDirectRtk.rtk_02;
            return this.rmqPublishExchange.publishToDirect(rtk, { msg: 'Hello world from Rtk 02', yoho: 'ecec'})
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
