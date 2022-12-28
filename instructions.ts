import { join } from 'path'
import * as sinkStatic from '@adonisjs/sink'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'

function getStub(...relativePaths: string[]) {
  return join(__dirname, 'templates', ...relativePaths)
}

function makeConfig(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {
  const configDirectory = app.directoriesMap.get('config') || 'config'
  const configPath = join(configDirectory, 'kafka.ts')
  const kafkaConfig = new sink.files.MustacheFile(projectRoot, configPath, getStub('config.txt'))

  if (kafkaConfig.exists()) {
    sink.logger.action('skip').succeeded(configPath)
    return
  }
  kafkaConfig.commit()
  sink.logger.action('create').succeeded(configPath)
}

function makeContract(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {
  const contractsPath = app.makePath('contracts/kafka.ts')
  const kafkaContract = new sink.files.MustacheFile(
    projectRoot,
    contractsPath,
    getStub('contract.txt')
  )

  if (kafkaContract.exists()) {
    sink.logger.action('skip').succeeded('contracts/kafka.ts')
    return
  }
  kafkaContract.commit()
  sink.logger.action('create').succeeded('contracts/kafka.ts')
}

function makeStart(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {
  const startPath = app.makePath('start/kafka.ts')
  const kafkaStart = new sink.files.MustacheFile(projectRoot, startPath, getStub('start.txt'))

  if (kafkaStart.exists()) {
    sink.logger.action('skip').succeeded('start/kafka.ts')
    return
  }
  kafkaStart.commit()
  sink.logger.action('create').succeeded('start/kafka.ts')
}

export default async function instructions(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic
) {
  sink.getPrompt().ask('Do you want install kafka nodejs client?', {
    validate(_) {
      makeConfig(projectRoot, app, sink)
      makeContract(projectRoot, app, sink)
      makeStart(projectRoot, app, sink)
      return true
    },
  })
}
