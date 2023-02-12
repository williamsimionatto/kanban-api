import { EditProjectController } from '../../../../presentation/controllers'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators'
import { makeDbCheckOrganizationById, makeDbCheckProjectById, makeDbEditProject } from '../../usecases'
import { makeEditProjectValidation } from './edit-project-validation-factory'

export const makeEditProjectController = (): Controller => {
  const controller = new EditProjectController(
    makeEditProjectValidation(),
    makeDbEditProject(),
    makeDbCheckProjectById(),
    makeDbCheckOrganizationById()
  )

  return makeLogControllerDecorator(controller)
}
