import { DbAddAccount } from '../../data/usecases/add-account'
import { BcryptAdapter } from '../../infra/cryptography'
import { AccountMongoRepository } from '../../infra/db/mongodb'
import { SignUpController } from '../../presentation/controllers'
import { EmailValidatorAdapter } from '../../utils'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const brcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(brcryptAdapter, accountMongoRepository)
  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}
