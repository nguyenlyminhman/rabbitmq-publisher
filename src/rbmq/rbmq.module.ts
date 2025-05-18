import { DynamicModule, Module } from '@nestjs/common';
import { RbmqService } from './rbmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

interface RbmqModuleOptions {
  queueName: string;
}

@Module({
  providers: [RbmqService]
})
export class RbmqModule {
  static register({ queueName }: RbmqModuleOptions): DynamicModule {

    return {
      module: RbmqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: queueName,
            useFactory: (configService: ConfigService) => {

              const USERNAME = configService.get<string>('RABBIT_USERNAME');
              const PASSWORD = configService.get<string>('RABBIT_PASSWORD');
              const HOST = configService.get<string>('RABBIT_HOST');

              const RABBIT_URL = `amqps://${USERNAME}:${PASSWORD}@${HOST}`;

              return {
                transport: Transport.RMQ,
                options: {
                  urls: [`${RABBIT_URL}`],
                  queue: queueName,
                },
              }
            },
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
