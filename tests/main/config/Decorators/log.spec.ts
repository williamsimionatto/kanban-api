import { LogControllerDecorator } from '../../../../src/main/decorators'
import { Controller, HttpRequest, HttpResponse } from '../../../../src/presentation/protocols'

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (request: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          name: 'William'
        }
      }

      return new Promise(resolve => resolve(httpResponse))
    }
  }

  return new ControllerStub()
}

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const controllerStub = makeController()
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const sut = new LogControllerDecorator(controllerStub)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
