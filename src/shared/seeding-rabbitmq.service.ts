import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';
import { EDirect } from 'src/objects/enums/direct.enum';
import { EFanout } from 'src/objects/enums/fanout.enum';
import { EHeaders } from 'src/objects/enums/headers.enum';
import { ETopic } from 'src/objects/enums/topic.enum';

@Injectable()
export class SeedingRabbitMqService implements OnModuleInit, OnModuleDestroy {

  private connection : amqp.Connection;
  private channel : amqp.Channel;
  private RABBIT_URL : String;


  private FANOUT = 'fanout';
  private DIRECT = 'direct';
  private TOPIC = 'topic';
  private HEADERS = 'headers';
  
  private publisherFanout = EFanout.FANOUT_EXCHANGE;
  private publisherDirect = EDirect.DIRECT_EXCHANGE;
  private publisherTopic =  ETopic.TOPIC_EXCHANGE;
  private publisherHeader = EHeaders.HEADERS_EXCHANGE;
  
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

    const fanoutQueues  = [EFanout.FANOUT_QUEUE];
    const directQueues  = [EDirect.DIRECT_QUEUE];
    const topicQueues   = [ETopic.TOPIC_QUEUE];
    const headersQueues = [EHeaders.HEADERS_QUEUE];


    // Using for push message to Queue with pattern
    this.seedingExchangeAndBindingQueue(this.publisherFanout, this.FANOUT, true, fanoutQueues);
    this.seedingExchangeAndBindingQueue(this.publisherDirect, this.DIRECT, true, directQueues);
    this.seedingExchangeAndBindingQueue(this.publisherTopic, this.TOPIC, true, topicQueues);
    this.seedingExchangeAndBindingQueue(this.publisherHeader, this.HEADERS, true, headersQueues);


    // this.seedingExchangeAndBindingQueueWithRoutingKey();
    }

  async seedingExchangeAndBindingQueue(exchangeName: string, exchangeType: string, durable: boolean, queueList: string[] ) {
    await this.channel.assertExchange(exchangeName, exchangeType, { durable: durable });
    
    for (const queue of queueList) {
      await this.channel.unbindQueue(queue, exchangeName, '');
      await this.channel.assertQueue(queue, { durable: true });
      await this.channel.bindQueue(queue, exchangeName, '');
      console.log(`Queue ${queue} is bound to ${exchangeType} exchange ${exchangeName}`);
    } 
  }

  async seedingExchangeAndBindingQueueWithRoutingKey(exchangeName: string, exchangeType: string, durable: boolean, queueList: string[] ) {

  }

  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
  }
}
