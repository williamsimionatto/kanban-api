import { AddProjectPhaseController } from '../../../../presentation/controllers'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators'
import { makeDbCheckProjectById, makeDbCheckProjectPhase } from '../../usecases'
import { makeDbAddProjectPhase } from '../../usecases/add-project-phase'
import { makeAddProjectPhaseValidation } from './add-project-phase-validation-factory'

export const makeAddProjectPhaseController = (): Controller => {
  const controller = new AddProjectPhaseController(
    makeAddProjectPhaseValidation(),
    makeDbAddProjectPhase(),
    makeDbCheckProjectById(),
    makeDbCheckProjectPhase()
  )

  return makeLogControllerDecorator(controller)
}
