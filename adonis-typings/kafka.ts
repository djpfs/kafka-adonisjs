


declare module '@ioc:Message/Kafka' {


  export interface KafkaConfig {
    enabled: string
    clientId: string
    groupId: string
    url: string
    port: number
    urls?: string
    fromBeginning: boolean
    autoCommit: boolean
    connectionTimeout?: number
    requestTimeout?: number
    partitionsConcurrently?: number
    logLevel: any
  }

  import { RecordMetadata, Kafka as KafkaJs } from 'kafkajs'

  type Consumer = import('./../src/Consumer').default;
  type Producer = import('./../src/Producer').default;


  export interface KafkaContract {
    start: (...args: any[]) => void
    on: (...args: any[]) => void
    send: (topic: string, data: object) => Promise<RecordMetadata[] | undefined>
    disconnect: () => void,
    consumer: Consumer,
    producer: Producer,
    kafka: KafkaJs
  }

  const Kafka: KafkaContract

  export * from 'kafkajs'
  export default Kafka
}
