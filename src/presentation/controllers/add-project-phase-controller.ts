import { AddProjectPhase, CheckProjectById } from '../../domain/usecases'
import { InvalidParamError } from '../errors'
import { badRequest, created, forbidden, serverError } from '../helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class AddProjectPhaseController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addProjectPhase: AddProjectPhase,
    private readonly checkProjectById: CheckProjectById
  ) {}

  async handle (request: AddProjectPhaseController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const projectExists = await this.checkProjectById.checkById(request.projectId)
      if (!projectExists) {
        return forbidden(new InvalidParamError('projectId'))
      }

      await this.addProjectPhase.add(request)

      return created({
        message: 'Phase added successfully'
      })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddProjectPhaseController {
  export type Request = AddProjectPhase.Params
}
