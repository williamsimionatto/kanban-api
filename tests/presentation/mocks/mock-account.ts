import faker from 'faker'

import { Authentication } from '../../../src/domain/usecases'

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  result = {
    accessToken: faker.datatype.uuid()
  }

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    return this.result
  }
}
