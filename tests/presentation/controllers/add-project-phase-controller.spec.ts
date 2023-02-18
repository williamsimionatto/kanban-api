import faker from 'faker'

import { AddProjectPhaseController } from '../../../src/presentation/controllers'
import { badRequest } from '../../../src/presentation/helpers'
import { AddProjectPhaseSpy, ValidationSpy } from '../mocks'

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
  addProjectPhaseSpy: AddProjectPhaseSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addProjectPhaseSpy = new AddProjectPhaseSpy()
  const sut = new AddProjectPhaseController(validationSpy, addProjectPhaseSpy)

  return {
    sut,
    validationSpy,
    addProjectPhaseSpy
  }
}

describe('AddProjectPhase Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toEqual(httpRequest)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddProjectPhase with correct values', async () => {
    const { sut, addProjectPhaseSpy } = makeSut()
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(addProjectPhaseSpy.params).toEqual({ ...request })
  })
})
