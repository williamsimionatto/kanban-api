import { MissingParamError } from '../errors'
import { badRequest } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols'

export class SignUpController {
  handle (httpRquest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRquest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
