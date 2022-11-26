import { AddOrganizationMembers } from '../../domain/usecases'
import { badRequest, noContent, serverError } from '../helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class AddOrganizationMemberController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addOrganizationMembers: AddOrganizationMembers
  ) {}

  async handle (request: AddOrganizationMemberController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { ...member } = request
      await this.addOrganizationMembers.add(member)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddOrganizationMemberController {
  export type Request = {
    organizationId: string
    accountId: string
  }
}
