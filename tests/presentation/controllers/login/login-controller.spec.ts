import { LoginController } from '../../../../src/presentation/controllers'
import { MissingParamError } from '../../../../src/presentation/errors'
import { badRequest } from '../../../../src/presentation/helpers/http-helper'

type SutType = {
  sut: LoginController
}

const makeSut = (): SutType => {
  const sut = new LoginController()

  return {
    sut
  }
}

describe('Login Controller', () => {
  test('Should return 400 if no email is provied', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provied', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
