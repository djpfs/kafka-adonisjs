import { join } from 'path'
import * as sinkStatic from '@adonisjs/sink'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'

function getStub(...relativePaths: string[]) {
  return join(__dirname, 'templates', ...relativePaths)
}

export default async function instructions(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic
) {
  const configPath = app.configPath('kafka.ts')
  const kafkaConfig = new sink.files.MustacheFile(projectRoot, configPath, getStub('config.txt'))

  kafkaConfig.overwrite = true

  kafkaConfig.commit()

  const configDir = app.directoriesMap.get('config') || 'config'
  sink.logger.action('create').succeeded(`${configDir}/kafka.ts`)

  const contractsPath = app.makePath('contracts/kafka.ts')
  const kafkaContract = new sink.files.MustacheFile(
    projectRoot,
    contractsPath,
    getStub('contract.txt')
  )
  kafkaContract.overwrite = true

  kafkaContract.commit()

  sink.logger.action('create').succeeded('contracts/kafka.ts')

  const startPath = app.makePath('start/kafka.ts')
  const kafkaStart = new sink.files.MustacheFile(projectRoot, startPath, getStub('start.txt'))
  kafkaStart.overwrite = true

  kafkaStart.commit()

  sink.logger.action('create').succeeded('start/kafka.ts')
}
