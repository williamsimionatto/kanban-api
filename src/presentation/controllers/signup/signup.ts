import { AddAccount } from '../../../domain/usecases'
import { EmailValidator } from '../../../validation/protocols'
import { InvalidParamError } from '../../errors'
import { badRequest, serverError, created } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle (httpRquest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRquest.body)
      if (error) {
        return badRequest(error)
      }

      const { email, password, passwordConfirmation, name } = httpRquest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return created(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
