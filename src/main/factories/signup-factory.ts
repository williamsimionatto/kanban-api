import { DbAddAccount } from '../../data/usecases/add-account'
import { BcryptAdapter } from '../../infra/cryptography'
import { AccountMongoRepository } from '../../infra/db/mongodb'
import { LogMongoRepository } from '../../infra/db/mongodb/log'
import { SignUpController } from '../../presentation/controllers/signup'
import { Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils'
import { LogControllerDecorator } from '../decorators'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const brcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(brcryptAdapter, accountMongoRepository)
  const validationComposite = makeSignUpValidation()
  const singUpController = new SignUpController(emailValidatorAdapter, dbAddAccount, validationComposite)
  const logRepository = new LogMongoRepository()

  return new LogControllerDecorator(singUpController, logRepository)
}
