import faker from 'faker'
import MockDate from 'mockdate'

import { AddProjectController } from '../../../src/presentation/controllers'
import { InvalidParamError } from '../../../src/presentation/errors'
import { badRequest, forbidden, noContent, serverError } from '../../../src/presentation/helpers'

import { AddProjectSpy, CheckOrganizationByIdSpy, ValidationSpy } from '../mocks'

const makeFakeRequest = (): AddProjectController.Request => ({
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  status: faker.random.arrayElement(['active', 'inactive', 'done']),
  startDate: faker.date.recent(),
  organizationId: faker.datatype.uuid()
})

type SutTypes = {
  sut: AddProjectController
  validationSpy: ValidationSpy
  addProjectSpy: AddProjectSpy
  checkOrganizationByIdSpy: CheckOrganizationByIdSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addProjectSpy = new AddProjectSpy()
  const checkOrganizationByIdSpy = new CheckOrganizationByIdSpy()
  const sut = new AddProjectController(validationSpy, addProjectSpy, checkOrganizationByIdSpy)
  return {
    sut,
    validationSpy,
    addProjectSpy,
    checkOrganizationByIdSpy
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
    const { sut, validationSpy } = makeSut()
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddProject with correct values', async () => {
    const { sut, addProjectSpy } = makeSut()
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(addProjectSpy.params).toEqual({ ...request })
  })

  test('Should call AddProject with  endDate undefined', async () => {
    const { sut, addProjectSpy } = makeSut()
    const request = makeFakeRequest()
    request.endDate = undefined
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

  test('Should call CheckOrganizationById with correct values', async () => {
    const { sut, checkOrganizationByIdSpy } = makeSut()
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(checkOrganizationByIdSpy.id).toEqual(request.organizationId)
  })

  test('Should return 403 if CheckOrganizationById returns false', async () => {
    const { sut, checkOrganizationByIdSpy } = makeSut()
    checkOrganizationByIdSpy.result = false
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('organizationId')))
  })

  test('Should return 500 if CheckOrganizationById throws', async () => {
    const { sut, checkOrganizationByIdSpy } = makeSut()
    jest.spyOn(checkOrganizationByIdSpy, 'checkById').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
