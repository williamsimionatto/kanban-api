import { HttpRequest, HttpResponse } from './http'

export interface Controller {
  handle: (httpRquest: HttpRequest) => HttpResponse
}
