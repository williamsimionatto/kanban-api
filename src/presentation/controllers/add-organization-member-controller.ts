import { badRequest } from '../helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class AddOrganizationMemberController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (request: AddOrganizationMemberController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }

    return new Promise(resolve => resolve(null))
  }
}

export namespace AddOrganizationMemberController {
  export type Request = {
    organizationId: string
    memberId: string
  }
}
