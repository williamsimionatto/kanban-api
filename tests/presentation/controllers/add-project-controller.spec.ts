import { AddProjectController } from '../../../src/presentation/controllers'
import { badRequest, noContent, serverError } from '../../../src/presentation/helpers'
import { Validation } from '../../../src/presentation/protocols'

import faker from 'faker'
import MockDate from 'mockdate'
import { AddProjectSpy } from '../mocks'

const makeFakeRequest = (): AddProjectController.Request => ({
  name: 'any_name',
  description: 'any_description',
  status: 'any_status',
  startDate: faker.date.recent(),
  organizationId: faker.datatype.uuid()
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
  sut: AddProjectController
  validationStub: Validation
  addProjectSpy: AddProjectSpy
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const addProjectSpy = new AddProjectSpy()
  const sut = new AddProjectController(validationStub, addProjectSpy)
  return {
    sut,
    validationStub,
    addProjectSpy
  }
}

describe('AddProject Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddProject with correct values', async () => {
    const { sut, addProjectSpy } = makeSut()
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(addProjectSpy.params).toEqual({ ...request })
  })

  test('Should return 500 if AddProject throws', async () => {
    const { sut, addProjectSpy } = makeSut()
    jest.spyOn(addProjectSpy, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
