import { Kafka, Consumer as KafkaConsumer } from 'kafkajs'
import { KafkaConfig } from '@ioc:Message/Kafka'

class Consumer {
  public config: KafkaConfig
  public topics: string[]
  public events: any
  public killContainer: boolean
  public timeout: any = 0
  public consumer: KafkaConsumer

  constructor(kafka: Kafka, config: any) {
    this.config = config
    this.topics = []
    this.events = {}
    this.killContainer = false
    this.timeout = null

    this.consumer = kafka.consumer({ groupId: this.config.groupId })
  }

  public async execute({
    topic,
    partition,
    message,
  }: {
    topic: string
    partition: number
    message: any
  }) {
    const result = JSON.parse(message.value.toString())

    const events = this.events[topic] || []

    const promises = events.map((callback: any) => {
      return new Promise<void>((resolve) => {
        callback(result, async (commit = true) => {
          if (this.config.autoCommit) {
            return
          }

          if (commit) {
            const offset = (Number(message.offset) + 1).toString()

            await this.consumer.commitOffsets([{ topic, partition, offset }])
          }

          resolve()
        })
      })
    })

    await Promise.all(promises)
  }

  public async start() {
    await this.consumer.connect()

    await this.consumer.run({
      partitionsConsumedConcurrently: this.config.partitionsConcurrently || 1,
      autoCommit: this.config.autoCommit || false,
      eachMessage: async ({ topic, partition, message }: any) =>
        this.execute({ topic, partition, message }),
    })
  }

  public async on(topic: any, callback: any) {
    let topicArray = topic

    if (typeof topic === 'string') {
      topicArray = topic.split(',')
    }

    topicArray.forEach(async (item: any) => {
      if (!item) {
        return
      }

      const events = this.events[item] || []

      events.push(callback)

      this.events[item] = events

      this.topics.push(item)

      await this.consumer.subscribe({
        topic: item,
        fromBeginning: true,
      })
    })
  }
}

export default Consumer
