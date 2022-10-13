import { AddAccount } from '../../../domain/usecases'
import { Encrypter } from '../../protocols/cryptography'
import { AddAccountRepository } from '../../protocols/db/account'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (accountData: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))

    return account
  }
}
