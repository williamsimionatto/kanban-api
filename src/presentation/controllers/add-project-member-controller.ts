import { AddProjectMembers, CheckProjectMember, CheckProjectById } from '../../domain/usecases'

import { InvalidParamError } from '../errors'
import { badRequest, created, forbidden, serverError } from '../helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class AddProjectMemberController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addProjectMembers: AddProjectMembers,
    private readonly checkProjectById: CheckProjectById,
    private readonly checkProjectMember: CheckProjectMember
  ) {}

  async handle (request: AddProjectMemberController.Request): Promise<HttpResponse> {
    try {
      const { projectId, accountId } = request
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const projectExists = await this.checkProjectById.checkById(projectId)
      if (!projectExists) {
        return forbidden(new InvalidParamError('projectId'))
      }

      const isMember = await this.checkProjectMember.checkMember({ projectId, memberId: accountId })
      if (isMember) {
        return forbidden(new InvalidParamError('memberId'))
      }

      await this.addProjectMembers.add({ projectId, accountId, active: true })

      return created({
        message: 'Project member added successfully'
      })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddProjectMemberController {
  export type Request = {
    projectId: string
    accountId: string
  }
}
