import Consumer from './Consumer'
import Producer from './Producer'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { Admin, KafkaConfig, KafkaContract } from '@ioc:Message/Kafka'
import makeKafkaConfig from './Config'
import { Kafka as KafkaJs } from 'kafkajs'
import { EnvContract } from '@ioc:Adonis/Core/Env'
import { LoggerContract } from '@ioc:Adonis/Core/Logger'

export default class Kafka implements KafkaContract {
  public consumer!: Consumer
  public producer!: Producer
  public kafka!: KafkaJs
  public config: KafkaConfig
  public Logger: LoggerContract
  public admin?: Admin

  constructor(Logger: LoggerContract, env: EnvContract) {
    this.config = makeKafkaConfig(env)
    this.Logger = Logger
  }
  protected application!: ApplicationContract

  public async start() {
    const { groupId } = this.config

    if (groupId === null || groupId === undefined || groupId === '') {
      throw new Error('You need define a group')
    }

    this.createKafka()

    this.consumer = new Consumer(this.kafka, this.config)
    this.producer = new Producer(this.kafka, this.config)

    this.producer.start()
  }

  private createKafka() {
    const brokers = this.config.urls ? this.config.urls.split(',') : null

    this.kafka = new KafkaJs({
      clientId: this.config.clientId || 'local',
      brokers: brokers || [`${this.config.url}:${this.config.port}`],
      connectionTimeout: this.config.connectionTimeout,
      requestTimeout: this.config.requestTimeout,
      logLevel: this.config.logLevel,
    })

    if (this.kafka !== undefined) {
      this.admin = this.kafka.admin()
      this.admin.connect().catch((e) => this.Logger.error(`[admin] ${e.message}`, e))
    }
  }

  public on(topic: string, callback: any) {
    if (this.config.enabled !== 'true') return callback
    if (this.consumer === undefined) {
      this.start()
    }
    this.consumer.on(topic, callback)
  }

  public async send(topic: string, data: any) {
    if (this.config.enabled !== 'true') return
    if (this.producer === undefined) {
      this.start()
    }
    return await this.producer.send(topic, data)
  }

  public async disconnect() {
    await this.consumer.consumer.disconnect()
  }
}
