import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as amqp from 'amqplib';
import { ConfigService } from '@nestjs/config';
import { EExchange } from 'src/objects/enums/exchange.enum';

@Injectable()
export class RbmqPublishExchangeService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private RABBIT_URL: string;

  constructor(private readonly configService: ConfigService) {
    const USERNAME = this.configService.get<string>('RABBIT_USERNAME');
    const PASSWORD = this.configService.get<string>('RABBIT_PASSWORD');
    const HOST = this.configService.get<string>('RABBIT_HOST');
    this.RABBIT_URL = `amqps://${USERNAME}:${PASSWORD}@${HOST}`;
  }

  async onModuleInit() {
    this.connection = await amqp.connect(this.RABBIT_URL);
    this.channel = await this.connection.createChannel();
  }

  async publishToDirect(routingKey: string, message: any) {
    const exchange = EExchange.PublisherDirectQueue;
    const buffer = Buffer.from(JSON.stringify(message));
    this.channel.publish(exchange, routingKey, buffer);
  }

  async publishToTopic(routingKey: string, message: any) {
    const exchange = EExchange.PublisherTopicQueue;
    const buffer = Buffer.from(JSON.stringify(message));
    this.channel.publish(exchange, routingKey, buffer);
  }

  async publishToFanout(routingKey: string, message: any) {
    const exchange = EExchange.PublisherFanoutQueue;
    const buffer = Buffer.from(JSON.stringify(message));
    this.channel.publish(exchange, routingKey, buffer);
  }

  async publishToHeader(routingKey: string, message: any) {
    const exchange = EExchange.PublisherHeadersQueue;
    const buffer = Buffer.from(JSON.stringify(message));
    this.channel.publish(exchange, routingKey, buffer);
  }

  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
  }
}
