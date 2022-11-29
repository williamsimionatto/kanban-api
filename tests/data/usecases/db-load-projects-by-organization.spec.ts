import FakeObjectId from 'bson-objectid'
import { DbLoadProjectsByOrganization } from '../../../src/data/usecases'
import { LoadProjectsByOrganizationRepositorySpy } from '../mocks'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbLoadProjectsByOrganization
  loadProjectsByOrganizationRepositorySpy: LoadProjectsByOrganizationRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadProjectsByOrganizationRepositorySpy = new LoadProjectsByOrganizationRepositorySpy()
  const sut = new DbLoadProjectsByOrganization(loadProjectsByOrganizationRepositorySpy)

  return {
    sut,
    loadProjectsByOrganizationRepositorySpy
  }
}

let organizationId: string

describe('DbLoadProjectsByOrganization UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    organizationId = new FakeObjectId().toHexString()
  })

  test('Should call LoadProjectsByOrganizationRepository with correct values', async () => {
    const { sut, loadProjectsByOrganizationRepositorySpy } = makeSut()
    await sut.loadByOrganization(organizationId)
    expect(loadProjectsByOrganizationRepositorySpy.organizationId).toBe(organizationId)
  })

  test('Should throw if LoadProjectsByOrganizationRepository throws', async () => {
    const { sut, loadProjectsByOrganizationRepositorySpy } = makeSut()
    jest.spyOn(loadProjectsByOrganizationRepositorySpy, 'loadByOrganization').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.loadByOrganization(organizationId)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an empty array if LoadProjectsByOrganizationRepository returns an empty array', async () => {
    const { sut, loadProjectsByOrganizationRepositorySpy } = makeSut()
    loadProjectsByOrganizationRepositorySpy.result = []
    const projects = await sut.loadByOrganization(organizationId)
    expect(projects).toEqual([])
  })

  test('Should return an array of projects on success', async () => {
    const { sut, loadProjectsByOrganizationRepositorySpy } = makeSut()
    const projects = await sut.loadByOrganization(organizationId)
    expect(projects).toEqual(loadProjectsByOrganizationRepositorySpy.result)
  })
})
