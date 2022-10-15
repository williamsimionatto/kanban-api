import { LoginController } from '../../../../src/presentation/controllers'
import { MissingParamError } from '../../../../src/presentation/errors'
import { badRequest } from '../../../../src/presentation/helpers/http-helper'

describe('Login Controller', () => {
  test('Should return 400 if no email is provied', async () => {
    const sut = new LoginController()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provied', async () => {
    const sut = new LoginController()
    const httpRequest = {
      body: {
        email: 'any_email'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
