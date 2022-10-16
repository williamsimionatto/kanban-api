import { AddProjectController } from '../../../../presentation/controllers/project'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators'
import { makeDbAddProject } from '../../usecases'
import { makeAddProjectValidation } from './add-project-validation-factory'

export const makeAddProjectController = (): Controller => {
  const controller = new AddProjectController(makeAddProjectValidation(), makeDbAddProject())
  return makeLogControllerDecorator(controller)
}
