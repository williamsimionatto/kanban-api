import { EmailValidator } from '../../validation/protocols'
import { InvalidParamError, MissingParamError, ServerError } from '../errors'
import { badRequest } from '../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../protocols'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  handle (httpRquest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRquest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email } = httpRquest.body
      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}
