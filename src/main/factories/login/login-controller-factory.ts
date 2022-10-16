import env from '../../config/env'
import { LogControllerDecorator } from '../../decorators'
import { makeLoginValidation } from './login-validation-factory'
import { Controller } from '../../../presentation/protocols'
import { DbAuthentication } from '../../../data/usecases'
import { LoginController } from '../../../presentation/controllers'
import { LogMongoRepository } from '../../../infra/db/mongodb/log'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account'
import { BcryptAdapter, JwtAdapter } from '../../../infra/cryptography'

export const makeLoginController = (): Controller => {
  const accountMongoRepository = new AccountMongoRepository()
  const brcypAdapter = new BcryptAdapter(12)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    brcypAdapter,
    jwtAdapter,
    accountMongoRepository
  )

  const validation = makeLoginValidation()
  const loginController = new LoginController(dbAuthentication, validation)

  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}
