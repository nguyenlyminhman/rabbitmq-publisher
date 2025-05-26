import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';
import { EDirect } from 'src/objects/enums/direct.enum';
import { EExchange } from 'src/objects/enums/exchange.enum';
import { EFanout } from 'src/objects/enums/fanout.enum';
import { EHeaders } from 'src/objects/enums/headers.enum';
import { QueueType } from 'src/objects/enums/queue.type.enum';
import { ETopic } from 'src/objects/enums/topic.enum';
import { directQueueRtk } from 'src/objects/exchange/directEx.queue';
import { IQueue } from 'src/objects/exchange/IQueue';

@Injectable()
export class SeedingRabbitMqService implements OnModuleInit, OnModuleDestroy {

  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private RABBIT_URL: String;

  private publisherFanout = EFanout.FANOUT_EXCHANGE;
  private publisherDirect = EDirect.DIRECT_EXCHANGE;
  private publisherTopic = ETopic.TOPIC_EXCHANGE;
  private publisherHeader = EHeaders.HEADERS_EXCHANGE;

  private publisherTopicExchange = EExchange.PublisherTopicQueue;
  private publisherDirectExchange = EExchange.PublisherDirectQueue;
  private publisherFanoutExchange = EExchange.PublisherFanoutQueue;
  private publisherHeadersExchange = EExchange.PublisherHeadersQueue;

  constructor(private readonly configService: ConfigService) {
    const USERNAME = this.configService.get<string>('RABBIT_USERNAME');
    const PASSWORD = this.configService.get<string>('RABBIT_PASSWORD');
    const HOST = this.configService.get<string>('RABBIT_HOST');

    this.RABBIT_URL = `amqps://${USERNAME}:${PASSWORD}@${HOST}`;
  }

  async onModuleInit() {

    // Connect to RabbitMQ
    this.connection = await amqp.connect(this.RABBIT_URL);
    this.channel = await this.connection.createChannel();

    const fanoutQueues = [EFanout.FANOUT_QUEUE];
    const directQueues = [EDirect.DIRECT_QUEUE];
    const topicQueues = [ETopic.TOPIC_QUEUE];
    const headersQueues = [EHeaders.HEADERS_QUEUE];


    // Using for push message to Queue with pattern
    this.seedingExchangeAndBindingQueue(this.publisherFanout, QueueType.FANOUT, true, fanoutQueues);
    this.seedingExchangeAndBindingQueue(this.publisherDirect, QueueType.DIRECT, true, directQueues);
    this.seedingExchangeAndBindingQueue(this.publisherTopic, QueueType.TOPIC, true, topicQueues);
    this.seedingExchangeAndBindingQueue(this.publisherHeader, QueueType.HEADERS, true, headersQueues);

    this.seedingExchangeAndBindingQueueWithRoutingKey(this.publisherDirectExchange, QueueType.DIRECT, true, directQueueRtk);
  }

  async seedingExchangeAndBindingQueue(exchangeName: string, exchangeType: string, durable: boolean, queueList: string[]) {
    await this.channel.assertExchange(exchangeName, exchangeType, { durable: durable });

    for (const queue of queueList) {
      await this.channel.unbindQueue(queue, exchangeName, '');
      await this.channel.assertQueue(queue, { durable: true });
      await this.channel.bindQueue(queue, exchangeName, '');
      console.log(`Queue ${queue} is bound to ${exchangeType} exchange ${exchangeName}`);
    }
  }

  async seedingExchangeAndBindingQueueWithRoutingKey(exchangeName: string, exchangeType: string, durable: boolean, queueList: Array<IQueue>) {
    await this.channel.assertExchange(exchangeName, exchangeType, { durable: durable });

    for (const queue of queueList) {
      await this.channel.unbindQueue(queue.name, exchangeName, queue.rtk);
      await this.channel.assertQueue(queue.name, { durable: true });
      await this.channel.bindQueue(queue.name, exchangeName, queue.rtk);
      console.log(`Seeding "${queue.name}" with rtk "${queue.rtk}" is bound to exchange name "${exchangeName}" with type "${exchangeType}"`);
    }

  }

  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
  }
}
