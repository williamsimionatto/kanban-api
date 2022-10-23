import { AddOrganizationController } from '../../../../presentation/controllers/organization'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators'
import { maekDbAddOrganization } from '../../usecases'
import { makeAddOrganizationValidation } from './add-organization-validation-factory'

export const makeAddOrganizationController = (): Controller => {
  const controller = new AddOrganizationController(makeAddOrganizationValidation(), maekDbAddOrganization())
  return makeLogControllerDecorator(controller)
}
