import { DbAddAccount } from '../../data/usecases/add-account'
import { BcryptAdapter } from '../../infra/cryptography'
import { AccountMongoRepository } from '../../infra/db/mongodb'
import { LogMongoRepository } from '../../infra/db/mongodb/log'
import { SignUpController } from '../../presentation/controllers'
import { Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils'
import { LogControllerDecorator } from '../decorators'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const brcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(brcryptAdapter, accountMongoRepository)
  const singUpController = new SignUpController(emailValidatorAdapter, dbAddAccount)
  const logRepository = new LogMongoRepository()

  return new LogControllerDecorator(singUpController, logRepository)
}
