import { Authentication } from '../../../domain/usecases'
import { HashComparer } from '../../protocols/cryptography'
import { LoadAccountByEmailRepository } from '../../protocols/db/account'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth (authentication: Authentication.Params): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      await this.hashComparer.compare(authentication.password, account.password)
    }

    return null
  }
}
