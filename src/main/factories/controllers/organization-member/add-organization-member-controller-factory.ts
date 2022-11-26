import { AddOrganizationMemberController } from '../../../../presentation/controllers'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators'
import { makeDbAddOrganizationMembers } from '../../usecases/organization-member/db-add-organization-member'
import { makeAddOrganizationMembersValidation } from './add-organization-member-validation-factory'

export const makeAddOrganizationMembersController = (): Controller => {
  const controller = new AddOrganizationMemberController(makeAddOrganizationMembersValidation(), makeDbAddOrganizationMembers())
  return makeLogControllerDecorator(controller)
}
