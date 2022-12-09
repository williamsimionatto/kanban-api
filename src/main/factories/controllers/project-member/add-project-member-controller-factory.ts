import { AddProjectMemberController } from '../../../../presentation/controllers'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators'
import { makeDbCheckProjectById, makeDbCheckProjectMember } from '../../usecases'
import { makeDbAddProjectMembers } from '../../usecases/organization-member/db-add-organization-member'
import { makeAddProjectMembersValidation } from './add-project-member-validation-factory'

export const makeAddProjectMembersController = (): Controller => {
  const controller = new AddProjectMemberController(
    makeAddProjectMembersValidation(),
    makeDbAddProjectMembers(),
    makeDbCheckProjectById(),
    makeDbCheckProjectMember()
  )
  return makeLogControllerDecorator(controller)
}
