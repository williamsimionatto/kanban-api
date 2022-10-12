export class SignUpController {
  handle (httpRquest: any): any {
    return {
      statusCode: 400,
      body: new Error('Missing param: name')
    }
  }
}
