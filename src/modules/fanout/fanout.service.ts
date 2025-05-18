import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EFanout } from 'src/objects/enums/fanout.enum';

@Injectable()
export class FanoutService {
    constructor(
        @Inject(EFanout.FANOUT_QUEUE) private rmq: ClientProxy,
    ) { }

    async pushMsgQ1() {
        try {
            // {"pattern":"foex_queue","data":{"msg":"hello world from foex_queue"}}
            return this.rmq.emit(EFanout.FANOUT_QUEUE, { msg: 'hello world from ' + EFanout.FANOUT_PATTERN_01 })
        } catch (err) {
            console.log(EFanout.FANOUT_PATTERN_01, err);
            throw new BadRequestException(err);
        }
    }
}
