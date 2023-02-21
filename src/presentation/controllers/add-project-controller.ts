import { AddProject, CheckOrganizationById } from '../../domain/usecases'
import { ObjectNotFoundError } from '../errors'
import { badRequest, forbidden, noContent, serverError } from '../helpers/http-helper'
import { Controller, HttpResponse, Validation } from '../protocols'

export class AddProjectController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addProject: AddProject,
    private readonly checkOrganizationById: CheckOrganizationById
  ) {}

  async handle (request: AddProjectController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { name, description, status, startDate, endDate, organizationId } = request
      const organizationExists = await this.checkOrganizationById.checkById(organizationId)

      if (!organizationExists) {
        return forbidden(new ObjectNotFoundError('organizationId', organizationId))
      }

      await this.addProject.add({
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

export namespace AddProjectController {
  export type Request = {
    name: string
    description: string
    status: string
    startDate: Date
    endDate?: Date
    organizationId: string
  }
}
