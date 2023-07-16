import { KafkaConfig } from '@ioc:Message/Kafka'

function makeKafkaConfig(env: any): KafkaConfig {
  let config: any = {
    enabled: env.get('KAFKA_ENABLED', false),
    clientId: env.get('KAFKA_CLIENT_ID', 'default-client'),
    groupId: env.get('KAFKA_GROUP_ID', 'default-group'),
    ssl: env.get('KAFKA_SSL', false),
    autenticationTimeout: env.get('KAFKA_AUTENTICATION_TIMEOUT', 1000),
    url: env.get('KAFKA_URL', 'localhost'),
    port: env.get('KAFKA_PORT', 9092),
    urls: env.get('KAFKA_URLS', null),
    fromBeginning: env.get('KAFKA_FROM_BEGINNING', true),
    autoCommit: env.get('KAFKA_AUTO_COMMIT', false),
    partitionsConcurrently: env.get('KAFKA_PARTITIONS_CONCURRENTLY', 1),
    connectionTimeout: env.get('KAFKA_CONNECTION_TIMEOUT', 3000),
    requestTimeout: env.get('KAFKA_REQUEST_TIMEOUT', 60000),
    logLevel: env.get('KAFKA_LOG_LEVEL', 1),
    retry: {
      initialRetryTime: env.get('KAFKA_RETRY_INITIAL_RETRY_TIME', 300),
      retries: env.get('KAFKA_RETRY_RETRIES', 10),
    },
  }

  if (env.get('KAFKA_SASL', false)) {
    config.sasl = {
      username: env.get('KAFKA_USERNAME', null),
      password: env.get('KAFKA_PASSWORD', null),
      mechanism: env.get('KAFKA_MECHANISM', 'plain'),
    }
  }

  return config
}

export default makeKafkaConfig
