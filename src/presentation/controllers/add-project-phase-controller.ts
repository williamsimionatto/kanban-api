import { AddProjectPhase, CheckProjectById, CheckProjectPhase } from '../../domain/usecases'
import { DataIntegrityViolationError, InvalidParamError } from '../errors'
import { badRequest, created, forbidden, serverError } from '../helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class AddProjectPhaseController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addProjectPhase: AddProjectPhase,
    private readonly checkProjectById: CheckProjectById,
    private readonly checkProjectPhase: CheckProjectPhase
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

      const phaseExists = await this.checkProjectPhase.check({
        projectId: request.projectId,
        phaseType: request.type
      })

      if (phaseExists) {
        return forbidden(new DataIntegrityViolationError('type'))
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
