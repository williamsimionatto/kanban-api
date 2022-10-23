import { AddOrganization } from '../../../domain/usecases'
import { badRequest, noContent, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'

export class AddOrganizationController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addOrganization: AddOrganization
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { ...organization } = httpRequest.body
      await this.addOrganization.add(organization)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
