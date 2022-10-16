import { LoadAccountByToken } from '../../domain/usecases'
import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const accessToken = request.headers?.['x-access-token']
    if (accessToken) {
      await this.loadAccountByToken.load(accessToken)
    }

    return forbidden(new AccessDeniedError())
  }
}
