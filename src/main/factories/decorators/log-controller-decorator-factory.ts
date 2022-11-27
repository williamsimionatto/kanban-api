import { LogMongoRepository } from '../../../infra/db/mongodb'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logRepository)
}
