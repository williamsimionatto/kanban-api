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
})
