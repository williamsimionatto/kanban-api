import { LoadProjectsByOrganizationController } from '../../../src/presentation/controllers/'
import faker from 'faker'
import { LoadProjectsByOrganizationSpy } from '../mocks'
import { noContent, ok, serverError } from '../../../src/presentation/helpers'

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

  test('Should return 204 if LoadProjectsByOrganization returns empty', async () => {
    const { sut, loadProjectsByOrganizationSpy } = makeSut()
    loadProjectsByOrganizationSpy.result = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadProjectsByOrganization throws', async () => {
    const { sut, loadProjectsByOrganizationSpy } = makeSut()
    jest.spyOn(loadProjectsByOrganizationSpy, 'loadByOrganization').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
