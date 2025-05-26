import { Controller, Post } from '@nestjs/common';
import { DirectService } from './direct.service';

@Controller('direct')
export class DirectController {

    constructor(private directService: DirectService) { }

    @Post("/exchange/rtk01")
    async pushExchangeRtk01() {
        return this.directService.pushExchangeRtk01();
    }

    @Post("/exchange/rtk02")
    async pushExchangeRtk02() {
        return this.directService.pushExchangeRtk02();
    }

    @Post("/queue/q01")
    async pushMsgQ1() {
        return this.directService.pushMsgQ1();
    }

    @Post("/queue/q02")
    async pushMsgQ2() {
        return this.directService.pushMsgQ2();
    }
}
