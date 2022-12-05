import faker from 'faker'
import { DbCheckOrganizationById } from '../../../src/data/usecases'
import { CheckOrganizationByIdRepositorySpy } from '../mocks'

let organizationId: string

type SutTypes = {
  sut: DbCheckOrganizationById
  checkOrganizationByIdRepositorySpy: CheckOrganizationByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkOrganizationByIdRepositorySpy = new CheckOrganizationByIdRepositorySpy()
  const sut = new DbCheckOrganizationById(checkOrganizationByIdRepositorySpy)
  return {
    sut,
    checkOrganizationByIdRepositorySpy
  }
}

describe('DbCheckOrganizationById', () => {
  beforeAll(async () => {
    organizationId = faker.datatype.uuid()
  })

  test('Should call CheckOrganizationByIdRepository with correct values', async () => {
    const { sut, checkOrganizationByIdRepositorySpy } = makeSut()
    await sut.checkById(organizationId)
    expect(checkOrganizationByIdRepositorySpy.id).toBe(organizationId)
  })
})
