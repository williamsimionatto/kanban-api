import { DbAddAccount } from '../../data/usecases/add-account'
import { BcryptAdapter } from '../../infra/cryptography'
import { AccountMongoRepository } from '../../infra/db/mongodb'
import { LogMongoRepository } from '../../infra/db/mongodb/log'
import { SignUpController } from '../../presentation/controllers/signup'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorators'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const brcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(brcryptAdapter, accountMongoRepository)
  const singUpController = new SignUpController(dbAddAccount, makeSignUpValidation())
  const logRepository = new LogMongoRepository()

  return new LogControllerDecorator(singUpController, logRepository)
}
