import faker from 'faker'

import { AddProjectMembers } from '../../../src/domain/usecases'
import { AddProjectMemberController } from '../../../src/presentation/controllers'
import { InvalidParamError } from '../../../src/presentation/errors'
import { badRequest, forbidden, noContent, serverError } from '../../../src/presentation/helpers'

import { CheckProjectByIdSpy, ValidationSpy } from '../mocks'

const makeFakeRequest = (): AddProjectMemberController.Request => ({
  projectId: faker.datatype.uuid(),
  accountId: faker.datatype.uuid()
})

const makeAddProjectMembersStub = (): AddProjectMembers => {
  class AddProjectMembersStub implements AddProjectMembers {
    async add (params: AddProjectMembers.Params): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new AddProjectMembersStub()
}

type SutTypes = {
  sut: AddProjectMemberController
  validationSpy: ValidationSpy
  addProjectMembersStub: AddProjectMembers
  checkProjectByIdSpy: CheckProjectByIdSpy
}

const makeSut = (): SutTypes => {
  const checkProjectByIdSpy = new CheckProjectByIdSpy()
  const validationSpy = new ValidationSpy()
  const addProjectMembersStub = makeAddProjectMembersStub()
  const sut = new AddProjectMemberController(validationSpy, addProjectMembersStub, checkProjectByIdSpy)

  return {
    sut,
    validationSpy,
    addProjectMembersStub,
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
    const { sut, addProjectMembersStub } = makeSut()
    const addSpy = jest.spyOn(addProjectMembersStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return 500 if AddProjectMember throws', async () => {
    const { sut, addProjectMembersStub } = makeSut()
    jest.spyOn(addProjectMembersStub, 'add').mockImplementationOnce(() => {
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
    jest.spyOn(checkProjectByIdSpy, 'checkById').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
