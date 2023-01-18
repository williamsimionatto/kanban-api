import faker from 'faker'

import { LoadProjectByIdController } from '../../../src/presentation/controllers'
import { ok } from '../../../src/presentation/helpers'

import { LoadProjectByIdSpy } from '../mocks'

const mockRequest = (): LoadProjectByIdController.Request => ({
  projectId: faker.datatype.uuid()
})

type SutTypes = {
  sut: LoadProjectByIdController
  loadProjectByIdSpy: LoadProjectByIdSpy
}

const makeSut = (): SutTypes => {
  const loadProjectByIdSpy = new LoadProjectByIdSpy()
  const sut = new LoadProjectByIdController(loadProjectByIdSpy)

  return {
    sut,
    loadProjectByIdSpy
  }
}

describe('LoadProjectByIdController', () => {
  test('Should call LoadProjectById with correct value', async () => {
    const { sut, loadProjectByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadProjectByIdSpy.id).toBe(request.projectId)
  })

  test('Should return 200 with project on success', async () => {
    const { sut, loadProjectByIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadProjectByIdSpy.result))
  })
})
