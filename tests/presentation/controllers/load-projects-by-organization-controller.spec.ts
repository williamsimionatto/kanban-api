import { LoadProjectsByOrganizationController } from '../../../src/presentation/controllers/'
import faker from 'faker'
import { LoadProjectsByOrganizationSpy } from '../mocks'
import { ok } from '../../../src/presentation/helpers'

const mockRequest = (): LoadProjectsByOrganizationController.Request => ({
  organizationId: faker.datatype.uuid()
})

type SutTypes = {
  sut: LoadProjectsByOrganizationController
  loadProjectsByOrganizationSpy: LoadProjectsByOrganizationSpy
}

const makeSut = (): SutTypes => {
  const loadProjectsByOrganizationSpy = new LoadProjectsByOrganizationSpy()
  const sut = new LoadProjectsByOrganizationController(loadProjectsByOrganizationSpy)

  return {
    sut,
    loadProjectsByOrganizationSpy
  }
}

describe('LoadProjectsByOrganization Controller', () => {
  test('Should call LoadProjectsByOrganization with correct value', async () => {
    const { sut, loadProjectsByOrganizationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadProjectsByOrganizationSpy.organizationId).toBe(request.organizationId)
  })

  test('Should return 200 with projects on success', async () => {
    const { sut, loadProjectsByOrganizationSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadProjectsByOrganizationSpy.result))
  })
})
