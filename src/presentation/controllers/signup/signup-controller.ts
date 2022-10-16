import { AddAccount, Authentication } from '../../../domain/usecases'
import { badRequest, serverError, created } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRquest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password, name } = httpRquest.body
      const error = this.validation.validate(httpRquest.body)
      if (error) {
        return badRequest(error)
      }

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      await this.authentication.auth({ email, password })

      return created(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
