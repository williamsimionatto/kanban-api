import { CheckOrganizationById, CheckProjectById, EditProject } from '../../domain/usecases'
import { InvalidParamError } from '../errors'

import { badRequest, forbidden, noContent, serverError } from '../helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class EditProjectController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly editProject: EditProject,
    private readonly checkProjectById: CheckProjectById,
    private readonly checkOrganizationById: CheckOrganizationById
  ) {}

  async handle (request: EditProjectController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { id, name, description, status, startDate, endDate, organizationId } = request
      const projectExists = await this.checkProjectById.checkById(id)
      if (!projectExists) {
        return forbidden(new InvalidParamError('id'))
      }

      const organizationExists = await this.checkOrganizationById.checkById(organizationId)
      if (!organizationExists) {
        return forbidden(new InvalidParamError('organizationId'))
      }

      await this.editProject.edit({
        id,
        name,
        description,
        status,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : undefined,
        organizationId
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
