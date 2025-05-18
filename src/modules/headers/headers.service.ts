import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EHeaders } from 'src/objects/enums/headers.enum';

@Injectable()
export class HeadersService {
    constructor(
        @Inject(EHeaders.HEADERS_QUEUE) private rmq: ClientProxy,
    ) { }

    async pushMsgPdf() {
        try {
            const headers =
            {
                headers:
                {
                    format: 'pdf',
                    type: 'report'
                }
            }

            return this.rmq.emit({ ...headers }, { msg: 'hello world from Pdf with ' + EHeaders.HEADERS_QUEUE });
        } catch (err) {
            console.log(EHeaders.HEADERS_QUEUE, err);
            throw new BadRequestException(err);
        }
    }


    async pushMsgJson() {
        try {
            const headers =
            {
                headers:
                {
                    format: 'json',
                    type: 'report'
                }
            }

            return this.rmq.emit({ ...headers }, { msg: 'hello world from Json with ' + EHeaders.HEADERS_QUEUE });
        } catch (err) {
            console.log(EHeaders.HEADERS_QUEUE, err);
            throw new BadRequestException(err);
        }
    }



}
