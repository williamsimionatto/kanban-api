import { AddAccount } from '../../domain/usecases'
import { Hasher } from '../protocols/cryptography'
import { AddAccountRepository, CheckAccountByEmailRepository } from '../protocols/db/account'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const exist = await this.checkAccountByEmailRepository.checkByEmail(accountData.email)
    let isValid = false
    if (!exist) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      isValid = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    }

    return isValid
  }
}
