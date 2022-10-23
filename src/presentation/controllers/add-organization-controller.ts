import { AddOrganization } from '../../domain/usecases'
import { badRequest, noContent, serverError } from '../helpers/http-helper'
import { Controller, HttpResponse, Validation } from '../protocols'

export class AddOrganizationController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addOrganization: AddOrganization
  ) {}

  async handle (request: AddOrganizationController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { ...organization } = request
      await this.addOrganization.add(organization)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddOrganizationController {
  export type Request = {
    name: string
    description: string
  }
}
