import { Controller, Post } from '@nestjs/common';
import { DirectService } from './direct.service';

@Controller('direct')
export class DirectController {

    constructor(private directService: DirectService) { }

    @Post("/exchange")
    async pushExchange() {
        return this.directService.pushExchange();
    }

    @Post("/queue/q01")
    async pushMsgQ1() {
        return this.directService.pushMsgQ1();
    }

    @Post("/q02")
    async pushMsgQ2() {
        return this.directService.pushMsgQ2();
    }
}
