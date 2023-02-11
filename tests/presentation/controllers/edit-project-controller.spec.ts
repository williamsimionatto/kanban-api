import faker from 'faker'
import MockDate from 'mockdate'

import { EditProjectController } from '../../../src/presentation/controllers'
import { InvalidParamError } from '../../../src/presentation/errors'
import { badRequest, forbidden, noContent, serverError } from '../../../src/presentation/helpers'
import { CheckProjectByIdSpy, EditProjectSpy, ValidationSpy } from '../mocks'

const makeFakeRequest = (): EditProjectController.Request => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  status: faker.random.arrayElement(['active', 'inactive', 'done']),
  startDate: faker.date.recent(),
  organizationId: faker.datatype.uuid()
})

type SutTypes = {
  sut: EditProjectController
  validationSpy: ValidationSpy
  editProjectSpy: EditProjectSpy
  checkProjectByIdSpy: CheckProjectByIdSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const editProjectSpy = new EditProjectSpy()
  const checkProjectByIdSpy = new CheckProjectByIdSpy()
  const sut = new EditProjectController(validationSpy, editProjectSpy, checkProjectByIdSpy)

  return {
    sut,
    validationSpy,
    editProjectSpy,
    checkProjectByIdSpy
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
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('id')))
  })
})
