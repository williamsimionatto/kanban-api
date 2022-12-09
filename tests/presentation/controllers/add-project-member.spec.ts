import faker from 'faker'

import { AddProjectMemberController } from '../../../src/presentation/controllers'
import { InvalidParamError } from '../../../src/presentation/errors'
import { badRequest, forbidden, noContent, serverError } from '../../../src/presentation/helpers'

import { throwError } from '../../domain/mocks'
import { AddProjectMembersSpy, CheckProjectByIdSpy, ValidationSpy } from '../mocks'

const makeFakeRequest = (): AddProjectMemberController.Request => ({
  projectId: faker.datatype.uuid(),
  accountId: faker.datatype.uuid()
})

type SutTypes = {
  sut: AddProjectMemberController
  validationSpy: ValidationSpy
  addProjectMembersSpy: AddProjectMembersSpy
  checkProjectByIdSpy: CheckProjectByIdSpy
}

const makeSut = (): SutTypes => {
  const checkProjectByIdSpy = new CheckProjectByIdSpy()
  const validationSpy = new ValidationSpy()
  const addProjectMembersSpy = new AddProjectMembersSpy()
  const sut = new AddProjectMemberController(validationSpy, addProjectMembersSpy, checkProjectByIdSpy)

  return {
    sut,
    validationSpy,
    addProjectMembersSpy,
    checkProjectByIdSpy
  }
}

describe('AddProjectMember Controller', () => {
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

  test('Should call AddProjectMember with correct values', async () => {
    const { sut, addProjectMembersSpy } = makeSut()
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(addProjectMembersSpy.params).toEqual(request)
  })

  test('Should return 500 if AddProjectMember throws', async () => {
    const { sut, addProjectMembersSpy } = makeSut()
    jest.spyOn(addProjectMembersSpy, 'add').mockImplementationOnce(throwError)
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
})
