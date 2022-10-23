import { AddProject } from '../../domain/usecases'
import { badRequest, noContent, serverError } from '../helpers/http-helper'
import { Controller, HttpResponse, Validation } from '../protocols'

export class AddProjectController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addProject: AddProject
  ) {}

  async handle (request: AddProjectController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { name, description, status, startDate, endDate } = request
      await this.addProject.add({
        name,
        description,
        status,
        startDate,
        endDate
      })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddProjectController {
  export type Request = {
    name: string
    description: string
    status: string
    startDate: Date
    endDate: Date
  }
}
