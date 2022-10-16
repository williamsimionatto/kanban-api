import { DbAddAccount } from '../../../../data/usecases/add-account'
import { AddAccount } from '../../../../domain/usecases'
import { BcryptAdapter } from '../../../../infra/cryptography'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const brcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(brcryptAdapter, accountMongoRepository, accountMongoRepository)

  return dbAddAccount
}
