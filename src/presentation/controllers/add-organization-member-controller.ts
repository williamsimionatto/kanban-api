import { AddOrganizationMembers } from '../../domain/usecases'
import { badRequest } from '../helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class AddOrganizationMemberController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addOrganizationMembers: AddOrganizationMembers
  ) {}

  async handle (request: AddOrganizationMemberController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }

    const { organizationId, accountId } = request
    await this.addOrganizationMembers.add({ organizationId, accountId })

    return new Promise(resolve => resolve(null))
  }
}

export namespace AddOrganizationMemberController {
  export type Request = {
    organizationId: string
    accountId: string
  }
}
