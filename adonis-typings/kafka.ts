

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

  import { RecordMetadata } from 'kafkajs'

  export interface KafkaContract {
    start?: (...args: any[]) => void
    on?: (...args: any[]) => void
    send?: (topic: string, data: object) => Promise<RecordMetadata[]>,
    disconnect?: () => void
  }

  const Kafka: KafkaContract

  export * from 'kafkajs'
  export default Kafka
}
