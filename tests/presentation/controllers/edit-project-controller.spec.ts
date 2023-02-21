import faker from 'faker'
import MockDate from 'mockdate'

import { EditProjectController } from '../../../src/presentation/controllers'
import { ObjectNotFoundError } from '../../../src/presentation/errors'
import { badRequest, forbidden, noContent, serverError } from '../../../src/presentation/helpers'
import { CheckOrganizationByIdSpy, CheckProjectByIdSpy, EditProjectSpy, ValidationSpy } from '../mocks'

const makeFakeRequest = (): EditProjectController.Request => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  status: faker.random.arrayElement(['active', 'inactive', 'done']),
  startDate: faker.date.recent(),
  endDate: faker.date.future(),
  organizationId: faker.datatype.uuid()
})

type SutTypes = {
  sut: EditProjectController
  validationSpy: ValidationSpy
  editProjectSpy: EditProjectSpy
  checkProjectByIdSpy: CheckProjectByIdSpy
  checkOrganizationByIdSpy: CheckOrganizationByIdSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const editProjectSpy = new EditProjectSpy()
  const checkProjectByIdSpy = new CheckProjectByIdSpy()
  const checkOrganizationByIdSpy = new CheckOrganizationByIdSpy()
  const sut = new EditProjectController(
    validationSpy,
    editProjectSpy,
    checkProjectByIdSpy,
    checkOrganizationByIdSpy
  )

  return {
    sut,
    validationSpy,
    editProjectSpy,
    checkProjectByIdSpy,
    checkOrganizationByIdSpy
  }
}

describe('EditProject Controller', () => {
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

  test('Should call EditProject with correct values', async () => {
    const { sut, editProjectSpy } = makeSut()
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(editProjectSpy.params).toEqual({ ...request })
  })

  test('Should call EditProject with  endDate undefined', async () => {
    const { sut, editProjectSpy } = makeSut()
    const request = makeFakeRequest()
    request.endDate = undefined
    await sut.handle(request)
    expect(editProjectSpy.params).toEqual({ ...request })
  })

  test('Should return 500 if EditProject throws', async () => {
    const { sut, editProjectSpy } = makeSut()
    jest.spyOn(editProjectSpy, 'edit').mockImplementationOnce(() => {
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

  test('Should call CheckProjectById with correct values', async () => {
    const { sut, checkProjectByIdSpy } = makeSut()
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(checkProjectByIdSpy.id).toEqual(request.id)
  })

  test('Should return 403 if CheckProjectById returns false', async () => {
    const { sut, checkProjectByIdSpy } = makeSut()
    checkProjectByIdSpy.result = false
    const request = makeFakeRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new ObjectNotFoundError('id', request.id)))
  })

  test('Should return 500 if CheckProjectById throws', async () => {
    const { sut, checkProjectByIdSpy } = makeSut()
    jest.spyOn(checkProjectByIdSpy, 'checkById').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
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
    const request = makeFakeRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new ObjectNotFoundError('organizationId', request.organizationId)))
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
