import { AddProject } from '../../../../../src/domain/usecases'
import { AddProjectController } from '../../../../../src/presentation/controllers/project'
import { badRequest, serverError } from '../../../../../src/presentation/helpers/http-helper'
import { HttpRequest, Validation } from '../../../../../src/presentation/protocols'

import faker from 'faker'
import MockDate from 'mockdate'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    description: 'any_description',
    status: 'any_status',
    startDate: faker.date.recent(),
    endDate: faker.date.future()
  }
})

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddProjectStub = (): AddProject => {
  class AddProjectStub implements AddProject {
    async add (project: AddProject.Params): Promise<AddProject.Result> {
      return new Promise(resolve => resolve(true))
    }
  }

  return new AddProjectStub()
}

type SutTypes = {
  sut: AddProjectController
  validationStub: Validation
  addProjectStub: AddProject
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const addProjectStub = makeAddProjectStub()
  const sut = new AddProjectController(validationStub, addProjectStub)
  return {
    sut,
    validationStub,
    addProjectStub
  }
}

describe('AddProject Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddProject with correct values', async () => {
    const { sut, addProjectStub } = makeSut()
    const addSpy = jest.spyOn(addProjectStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if AddProject throws', async () => {
    const { sut, addProjectStub } = makeSut()
    jest.spyOn(addProjectStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
