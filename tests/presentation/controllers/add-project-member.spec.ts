import faker from 'faker'
import { AddProjectMembers } from '../../../src/domain/usecases'

import { AddProjectMemberController } from '../../../src/presentation/controllers/add-project-member-controller'
import { badRequest, noContent, serverError } from '../../../src/presentation/helpers'
import { Validation } from '../../../src/presentation/protocols'

const makeFakeRequest = (): AddProjectMemberController.Request => ({
  projectId: faker.datatype.uuid(),
  accountId: faker.datatype.uuid()
})

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

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
  validationStub: Validation
  addProjectMembersStub: AddProjectMembers
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const addProjectMembersStub = makeAddProjectMembersStub()
  const sut = new AddProjectMemberController(validationStub, addProjectMembersStub)
  return {
    sut,
    validationStub,
    addProjectMembersStub
  }
}

describe('AddProjectMember Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
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
})
