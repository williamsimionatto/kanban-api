import faker from 'faker'
import MockDate from 'mockdate'

import { EditProjectController } from '../../../src/presentation/controllers'
import { badRequest } from '../../../src/presentation/helpers'
import { EditProjectSpy, ValidationSpy } from '../mocks'

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
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const editProjectSpy = new EditProjectSpy()
  const sut = new EditProjectController(validationSpy, editProjectSpy)

  return {
    sut,
    validationSpy,
    editProjectSpy
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
})
