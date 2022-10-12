import { HttpRequest, HttpResponse } from '../protocols'

export class SignUpController {
  handle (httpRquest: HttpRequest): HttpResponse {
    if (!httpRquest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    }

    if (!httpRquest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email')
      }
    }
  }
}
