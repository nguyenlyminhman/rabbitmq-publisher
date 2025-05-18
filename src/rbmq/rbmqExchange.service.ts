import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as amqp from 'amqplib';
import { ConfigService } from '@nestjs/config';

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

  async publishToDirect(exchange: string, routingKey: string, message: any) {
    await this.channel.assertExchange(exchange, 'direct', { durable: true });
    const buffer = Buffer.from(JSON.stringify(message));
    this.channel.publish(exchange, routingKey, buffer);
  }

  async publishToTopic(exchange: string, routingKey: string, message: any) {
    await this.channel.assertExchange(exchange, 'topic', { durable: true });
    const buffer = Buffer.from(JSON.stringify(message));
    this.channel.publish(exchange, routingKey, buffer);
  }

  async publishToFanout(exchange: string, routingKey: string, message: any) {
    await this.channel.assertExchange(exchange, 'fanout', { durable: true });
    const buffer = Buffer.from(JSON.stringify(message));
    this.channel.publish(exchange, routingKey, buffer);
  }

  async publishToHeader(exchange: string, routingKey: string, message: any) {
    await this.channel.assertExchange(exchange, 'headers', { durable: true });
    const buffer = Buffer.from(JSON.stringify(message));
    this.channel.publish(exchange, routingKey, buffer);
  }

  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
  }
}
