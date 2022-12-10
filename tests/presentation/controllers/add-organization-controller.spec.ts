import faker from 'faker'

import { AddOrganizationController } from '../../../src/presentation/controllers'
import { badRequest, noContent, serverError } from '../../../src/presentation/helpers'
import { throwError } from '../../domain/mocks'
import { AddOrganizationSpy, ValidationSpy } from '../mocks'

const mockRequest = (): AddOrganizationController.Request => ({
  name: faker.name.findName(),
  description: faker.random.words()
})

type SutTypes = {
  sut: AddOrganizationController
  validationSpy: ValidationSpy
  addOrganizationSpy: AddOrganizationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addOrganizationSpy = new AddOrganizationSpy()

  const sut = new AddOrganizationController(validationSpy, addOrganizationSpy)
  return {
    sut,
    validationSpy,
    addOrganizationSpy
  }
}

describe('AddOrganization Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toEqual(httpRequest)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call AddOrganization with correct values', async () => {
    const { sut, addOrganizationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addOrganizationSpy.params).toEqual(httpRequest)
  })

  test('Should return 500 if AddOrganization throws', async () => {
    const { sut, addOrganizationSpy } = makeSut()
    jest.spyOn(addOrganizationSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
