import { Authentication } from '../../domain/usecases'
import { badRequest, ok, serverError, unauthorized } from '../helpers/http-helper'
import { Controller, HttpResponse, Validation } from '../protocols'

export class LoginController implements Controller {
  constructor (
    private readonly authencation: Authentication,
    private readonly validation: Validation
  ) {}

  async handle (request: LoginController.Request): Promise<HttpResponse> {
    try {
      const { email, password } = request
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const accessToken = await this.authencation.auth({ email, password })
      if (!accessToken) {
        return unauthorized()
      }

      return ok(accessToken)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
