import faker from 'faker'
import MockDate from 'mockdate'

import { EditProjectController } from '../../../src/presentation/controllers'
import { ValidationSpy } from '../mocks'

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
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new EditProjectController(validationSpy)
  return {
    sut,
    validationSpy
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
})
