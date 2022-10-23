import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'

export class AddOrganizationController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return null
  }
}