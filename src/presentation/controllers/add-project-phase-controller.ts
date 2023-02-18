import { AddProjectPhase } from '../../domain/usecases'
import { badRequest } from '../helpers'
import { Controller, Validation } from '../protocols'

export class AddProjectPhaseController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: AddProjectPhaseController.Request): Promise<any> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }

    return await new Promise(resolve => resolve(null))
  }
}

export namespace AddProjectPhaseController {
  export type Request = AddProjectPhase.Params
}
