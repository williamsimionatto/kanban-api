import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  constructor (private readonly controller: Controller) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(request)
    return httpResponse
  }
}
