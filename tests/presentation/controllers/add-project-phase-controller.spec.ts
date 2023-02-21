import faker from 'faker'

import { AddProjectPhaseController } from '../../../src/presentation/controllers'
import { DataIntegrityViolationError, InvalidParamError } from '../../../src/presentation/errors'
import { badRequest, created, forbidden, serverError } from '../../../src/presentation/helpers'
import { throwError } from '../../domain/mocks'
import { AddProjectPhaseSpy, CheckProjectByIdSpy, CheckProjectPhaseSpy, ValidationSpy } from '../mocks'

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
  checkProjectByIdSpy: CheckProjectByIdSpy
  checkProjectPhaseSpy: CheckProjectPhaseSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addProjectPhaseSpy = new AddProjectPhaseSpy()
  const checkProjectByIdSpy = new CheckProjectByIdSpy()
  const checkProjectPhaseSpy = new CheckProjectPhaseSpy()
  const sut = new AddProjectPhaseController(
    validationSpy,
    addProjectPhaseSpy,
    checkProjectByIdSpy,
    checkProjectPhaseSpy
  )

  return {
    sut,
    validationSpy,
    addProjectPhaseSpy,
    checkProjectByIdSpy,
    checkProjectPhaseSpy
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

  test('Should return serverError if AddProjectPhase throws', async () => {
    const { sut, addProjectPhaseSpy } = makeSut()
    jest.spyOn(addProjectPhaseSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return created on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(
      created({
        message: 'Phase added successfully'
      })
    )
  })

  test('Should call CheckProjectById with correct values', async () => {
    const { sut, checkProjectByIdSpy } = makeSut()
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(checkProjectByIdSpy.id).toBe(request.projectId)
  })

  test('Should return 403 if CheckProjectById returns false', async () => {
    const { sut, checkProjectByIdSpy } = makeSut()
    checkProjectByIdSpy.result = false
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('projectId')))
  })

  test('Should return 500 if CheckProjectById throws', async () => {
    const { sut, checkProjectByIdSpy } = makeSut()
    jest.spyOn(checkProjectByIdSpy, 'checkById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call CheckProjectPhase with correct values', async () => {
    const { sut, addProjectPhaseSpy } = makeSut()
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(addProjectPhaseSpy.params).toEqual({ ...request })
  })

  test('Should return 403 if CheckProjectPhase returns false', async () => {
    const { sut, checkProjectPhaseSpy } = makeSut()
    checkProjectPhaseSpy.result = true
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new DataIntegrityViolationError('type')))
  })

  test('Should throw if CheckProjectPhase throws', async () => {
    const { sut, checkProjectPhaseSpy } = makeSut()
    jest.spyOn(checkProjectPhaseSpy, 'check').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
