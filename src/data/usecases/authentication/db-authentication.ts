import { Authentication } from '../../../domain/usecases'
import { Encrypter, HashComparer } from '../../protocols/cryptography'
import { LoadAccountByEmailRepository } from '../../protocols/db/account'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  async auth (authentication: Authentication.Params): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const isvalid = await this.hashComparer.compare(authentication.password, account.password)
      if (isvalid) {
        await this.encrypter.encrypt(account.id)
      }
    }

    return null
  }
}
