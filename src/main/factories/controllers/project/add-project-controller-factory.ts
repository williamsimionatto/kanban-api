import { AddProjectController } from '../../../../presentation/controllers'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators'
import { makeDbAddProject, makeDbCheckOrganizationById } from '../../usecases'
import { makeAddProjectValidation } from './add-project-validation-factory'

export const makeAddProjectController = (): Controller => {
  const controller = new AddProjectController(
    makeAddProjectValidation(),
    makeDbAddProject(),
    makeDbCheckOrganizationById()
  )

  return makeLogControllerDecorator(controller)
}
