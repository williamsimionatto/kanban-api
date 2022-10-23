import faker from 'faker'
import { AddOrganization } from '../../../../src/domain/usecases'
import { AddOrganizationController } from '../../../../src/presentation/controllers/organization'
import { badRequest, noContent, serverError } from '../../../../src/presentation/helpers'
import { Validation } from '../../../../src/presentation/protocols'

const makeFakeRequest = (): AddOrganizationController.Request => ({
  name: faker.name.findName(),
  description: faker.random.words()
})

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddOrganizationStub = (): AddOrganization => {
  class AddOrganizationStub implements AddOrganization {
    async add (organization: AddOrganization.Params): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new AddOrganizationStub()
}

type SutTypes = {
  sut: AddOrganizationController
  validationStub: Validation
  addOrganizationStub: AddOrganization
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const addOrganizationStub = makeAddOrganizationStub()

  const sut = new AddOrganizationController(validationStub, addOrganizationStub)
  return {
    sut,
    validationStub,
    addOrganizationStub
  }
}

describe('AddOrganization Controller', () => {
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

  test('Should call AddOrganization with correct values', async () => {
    const { sut, addOrganizationStub } = makeSut()
    const addSpy = jest.spyOn(addOrganizationStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return 500 if AddOrganization throws', async () => {
    const { sut, addOrganizationStub } = makeSut()
    jest.spyOn(addOrganizationStub, 'add').mockImplementationOnce(() => {
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
