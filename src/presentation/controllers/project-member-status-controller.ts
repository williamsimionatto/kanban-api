import { ActivateProjectMember, InactivateProjectMember } from '../../domain/usecases'
import { badRequest } from '../helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class ProjectMemberStatusController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly activateProjectMember: ActivateProjectMember,
    private readonly inactivateProjectMember: InactivateProjectMember
  ) {}

  async handle (request: ProjectMemberStatusController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)

    if (error) {
      return badRequest(error)
    }

    const { projectId, accountId, active } = request
    if (active) {
      await this.activateProjectMember.activate({ projectId, accountId })
    } else {
      await this.inactivateProjectMember.inactivate({ projectId, accountId })
    }

    return await new Promise(resolve => resolve(null))
  }
}

export namespace ProjectMemberStatusController {
  export type Request = {
    projectId: string
    accountId: string
    active: boolean
  }
}
