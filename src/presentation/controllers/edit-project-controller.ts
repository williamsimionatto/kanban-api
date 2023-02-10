import { Controller, HttpResponse, Validation } from '../protocols'

export class EditProjectController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: EditProjectController.Request): Promise<HttpResponse> {
    this.validation.validate(request)
    return await new Promise(resolve => resolve(null))
  }
}

export namespace EditProjectController {
  export type Request = {
    id: string
    name: string
    description: string
    status: string
    startDate: Date
    endDate?: Date
    organizationId: string
  }
}
