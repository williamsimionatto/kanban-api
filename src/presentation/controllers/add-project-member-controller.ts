import { AddProjectMembers } from '../../domain/usecases'
import { badRequest, noContent, serverError } from '../helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class AddProjectMemberController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addProjectMembers: AddProjectMembers
  ) {}

  async handle (request: AddProjectMemberController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { ...member } = request
      await this.addProjectMembers.add(member)

      return noContent()
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
