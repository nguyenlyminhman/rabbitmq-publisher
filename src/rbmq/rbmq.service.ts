import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RbmqService {
    constructor(private readonly configService: ConfigService) {}

  
    getOptions(queue: string, noAck = false): RmqOptions {
      
      const USERNAME = this.configService.get<string>('RABBIT_USERNAME');
      const PASSWORD = this.configService.get<string>('RABBIT_PASSWORD');
      const HOST = this.configService.get<string>('RABBIT_HOST');
      const QUEUE = this.configService.get<string>('RABBIT_QUEUE');

      const RABBIT_URL = `amqps://${USERNAME}:${PASSWORD}@${HOST}`; 
      
      return {
        transport: Transport.RMQ,
        options: {
          urls: [`${RABBIT_URL}`],
          queue: queue,
          noAck,
          persistent: true,
        },
      };
    }
  
    ack(context: RmqContext) {
      const channel = context.getChannelRef();
      const originalMessage = context.getMessage();
      channel.ack(originalMessage);
    }
}
