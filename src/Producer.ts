import { Kafka, Producer as KafkaProducer } from 'kafkajs'
import { KafkaConfig } from '@ioc:Message/Kafka'

class Producer {
  public config: KafkaConfig
  public producer: KafkaProducer

  constructor(kafka: Kafka, config: any) {
    this.config = config

    this.producer = kafka.producer()
  }

  public async start() {
    await this.producer.connect()
  }

  public async send(topic: string, data: any) {
    if (this.config.enabled !== 'true') {
      return
    }

    if (typeof data !== 'object') {
      throw new Error('You need send a json object in data argument')
    }

    let messages = Array.isArray(data) ? data : [data]
    messages = messages.map((message) => {
      if (!message.value) {
        message = {
          value: JSON.stringify(message),
        }
      }

      if (typeof message.value !== 'string') {
        message.value = JSON.stringify(message.value)
      }

      return message
    })

    return await this.producer.send({
      topic,
      messages,
    })
  }
}

export default Producer
