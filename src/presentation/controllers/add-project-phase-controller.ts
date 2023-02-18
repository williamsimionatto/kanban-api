import { AddProjectPhase } from '../../domain/usecases'
import { Controller, Validation } from '../protocols'

export class AddProjectPhaseController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: AddProjectPhaseController.Request): Promise<any> {
    this.validation.validate(request)
    return await new Promise(resolve => resolve(null))
  }
}

export namespace AddProjectPhaseController {
  export type Request = AddProjectPhase.Params
}
