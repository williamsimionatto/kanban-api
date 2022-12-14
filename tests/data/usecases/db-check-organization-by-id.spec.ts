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

  test('Should return false if CheckOrganizationByIdRepository returns false', async () => {
    const { sut, checkOrganizationByIdRepositorySpy } = makeSut()
    checkOrganizationByIdRepositorySpy.result = false
    const result = await sut.checkById(organizationId)
    expect(result).toBe(false)
  })

  test('Should return true if CheckOrganizationByIdRepository returns true', async () => {
    const { sut, checkOrganizationByIdRepositorySpy } = makeSut()
    checkOrganizationByIdRepositorySpy.result = true
    const result = await sut.checkById(organizationId)
    expect(result).toBe(true)
  })

  test('Should throw if CheckOrganizationByIdRepository throws', async () => {
    const { sut, checkOrganizationByIdRepositorySpy } = makeSut()
    jest.spyOn(checkOrganizationByIdRepositorySpy, 'checkById').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.checkById(organizationId)
    await expect(promise).rejects.toThrow()
  })
})
