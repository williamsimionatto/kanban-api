import { AddProject } from '../../../../domain/usecases'
import { badRequest } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../../protocols'

export class AddProjectController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addProject: AddProject
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }

    await this.addProject.add(httpRequest.body)

    return null
  }
}
