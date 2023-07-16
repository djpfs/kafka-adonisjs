declare module '@ioc:Message/Kafka' {
  import { RecordMetadata, Kafka as KafkaJs, Admin, KafkaConfig as KafkaJsConfig } from 'kafkajs'
  export interface KafkaConfig extends KafkaJsConfig {
    enabled: string
    url: string
    port: number
    urls?: string
    groupId: string
  }

  type Consumer = import('./../src/Consumer').default
  type Producer = import('./../src/Producer').default

  export interface KafkaContract {
    start: (...args: any[]) => void
    on: (...args: any[]) => void
    send: (topic: string, data: object) => Promise<RecordMetadata[] | undefined>
    disconnect: () => void
    consumer: Consumer
    producer: Producer
    kafka: KafkaJs
    admin?: Admin
  }

  const Kafka: KafkaContract

  export * from 'kafkajs'
  export default Kafka
}
