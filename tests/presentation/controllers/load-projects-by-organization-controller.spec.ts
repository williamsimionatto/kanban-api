import { LoadProjectsByOrganizationController } from '../../../src/presentation/controllers/'
import faker from 'faker'
import { LoadProjectsByOrganizationSpy } from '../mocks'

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
})
