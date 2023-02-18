import { AddProjectPhase } from '../../domain/usecases'
import { badRequest, created, serverError } from '../helpers'
import { Controller, Validation } from '../protocols'

export class AddProjectPhaseController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addProjectPhase: AddProjectPhase
  ) {}

  async handle (request: AddProjectPhaseController.Request): Promise<any> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
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
