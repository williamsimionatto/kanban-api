import { CheckProjectById, EditProject } from '../../domain/usecases'

import { badRequest, noContent, serverError } from '../helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class EditProjectController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly editProject: EditProject,
    private readonly checkProjectById: CheckProjectById
  ) {}

  async handle (request: EditProjectController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      await this.checkProjectById.checkById(request.id)

      await this.editProject.edit({
        ...request,
        startDate: new Date(request.startDate),
        endDate: request.endDate ? new Date(request.endDate) : undefined
      })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace EditProjectController {
  export type Request = {
    id: string
    name: string
    description: string
    status: string
    startDate: Date
    endDate?: Date
    organizationId: string
  }
}
