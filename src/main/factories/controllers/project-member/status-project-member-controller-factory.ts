import { ProjectMemberStatusController } from '../../../../presentation/controllers'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators'
import { makeDbActivateProjectMember, makeDbInctivateProjectMember } from '../../usecases'
import { makeStatusProjectMemberValidation } from './status-project-member-validation-factory'

export const makeStatusProjectMemberController = (): Controller => {
  const controller = new ProjectMemberStatusController(
    makeStatusProjectMemberValidation(),
    makeDbActivateProjectMember(),
    makeDbInctivateProjectMember()
  )

  return makeLogControllerDecorator(controller)
}
