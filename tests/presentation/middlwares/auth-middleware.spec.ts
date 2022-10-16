import { AccessDeniedError } from '../../../src/presentation/errors'
import { forbidden } from '../../../src/presentation/helpers/http-helper'
import { AuthMiddleware } from '../../../src/presentation/middlewares'

const makeSut = (): AuthMiddleware => {
  return new AuthMiddleware()
}

describe('Auth Middlware', () => {
  test('Should return 403 if x-access-token no exists in headers', async () => {
    const sut = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
