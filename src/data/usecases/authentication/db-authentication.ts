import { Authentication } from '../../../domain/usecases'
import { LoadAccountByEmailRepository } from '../../protocols/db/account'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async auth (authentication: Authentication.Params): Promise<string> {
    await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    return null
  }
}
