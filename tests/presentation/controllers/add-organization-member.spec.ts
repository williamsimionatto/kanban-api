import faker from 'faker'
import { AddOrganizationMembers } from '../../../src/domain/usecases'

import { AddOrganizationMemberController } from '../../../src/presentation/controllers/add-organization-member-controller'
import { badRequest, noContent, serverError } from '../../../src/presentation/helpers'
import { Validation } from '../../../src/presentation/protocols'

const makeFakeRequest = (): AddOrganizationMemberController.Request => ({
  organizationId: faker.datatype.uuid(),
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

const makeAddOrganizationMembersStub = (): AddOrganizationMembers => {
  class AddOrganizationMembersStub implements AddOrganizationMembers {
    async add (params: AddOrganizationMembers.Params): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new AddOrganizationMembersStub()
}

type SutTypes = {
  sut: AddOrganizationMemberController
  validationStub: Validation
  addOrganizationMembersStub: AddOrganizationMembers
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const addOrganizationMembersStub = makeAddOrganizationMembersStub()
  const sut = new AddOrganizationMemberController(validationStub, addOrganizationMembersStub)
  return {
    sut,
    validationStub,
    addOrganizationMembersStub
  }
}

describe('AddOrganizationMember Controller', () => {
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

  test('Should call AddOrganizationMember with correct values', async () => {
    const { sut, addOrganizationMembersStub } = makeSut()
    const addSpy = jest.spyOn(addOrganizationMembersStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return 500 if AddOrganizationMember throws', async () => {
    const { sut, addOrganizationMembersStub } = makeSut()
    jest.spyOn(addOrganizationMembersStub, 'add').mockImplementationOnce(() => {
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
