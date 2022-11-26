import { Controller, HttpResponse, Validation } from '../protocols'

export class AddOrganizationMemberController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (request: AddOrganizationMemberController.Request): Promise<HttpResponse> {
    this.validation.validate(request)
    return new Promise(resolve => resolve(null))
  }
}

export namespace AddOrganizationMemberController {
  export type Request = {
    organizationId: string
    memberId: string
  }
}
