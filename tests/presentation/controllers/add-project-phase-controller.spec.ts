import faker from 'faker'

import { AddProjectPhaseController } from '../../../src/presentation/controllers'
import { ValidationSpy } from '../mocks'

const makeFakeRequest = (): AddProjectPhaseController.Request => ({
  projectId: faker.datatype.uuid(),
  name: faker.random.words(),
  description: faker.random.words(),
  order: faker.datatype.number(),
  type: faker.random.arrayElement(['BACKLOG', 'TODO', 'DOING', 'BLOCKED', 'REVIEW', 'DONE'])
})

type SutTypes = {
  sut: AddProjectPhaseController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new AddProjectPhaseController(validationSpy)

  return {
    sut,
    validationSpy
  }
}

describe('AddProjectPhase Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toEqual(httpRequest)
  })
})
