import { LoadProjectsByOrganizationController } from '../../../../presentation/controllers'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators'
import { makeDbLoadProjectsByOrganization } from '../../usecases'

export const makeLoadProjectsByOrganizationController = (): Controller => {
  const controller = new LoadProjectsByOrganizationController(makeDbLoadProjectsByOrganization())
  return makeLogControllerDecorator(controller)
}
