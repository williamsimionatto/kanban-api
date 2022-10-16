import { AddAccount, Authentication } from '../../../domain/usecases'
import { EmailInUseError } from '../../errors'
import { badRequest, serverError, ok, forbidden } from '../../helpers/http-helper'
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

      if (!account) {
        return forbidden(new EmailInUseError())
      }

      const accessToken = await this.authentication.auth({ email, password })

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
