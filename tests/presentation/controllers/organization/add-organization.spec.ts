import faker from 'faker'
import { AddOrganizationController } from '../../../../src/presentation/controllers/organization'
import { badRequest } from '../../../../src/presentation/helpers/http-helper'
import { HttpRequest, Validation } from '../../../../src/presentation/protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: faker.name.findName(),
    description: faker.random.words()
  }
})

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  sut: AddOrganizationController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()

  const sut = new AddOrganizationController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('AddOrganization Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
})
