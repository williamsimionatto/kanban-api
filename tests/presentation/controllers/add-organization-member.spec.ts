import faker from 'faker'

import { AddOrganizationMemberController } from '../../../src/presentation/controllers/add-organization-member-controller'
import { Validation } from '../../../src/presentation/protocols'

const makeFakeRequest = (): AddOrganizationMemberController.Request => ({
  organizationId: faker.datatype.uuid(),
  memberId: faker.datatype.uuid()
})

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  sut: AddOrganizationMemberController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const sut = new AddOrganizationMemberController(validationStub)
  return {
    sut,
    validationStub
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
})
