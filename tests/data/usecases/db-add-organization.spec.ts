import faker from 'faker'
import { AddOrganizationRepository } from '../../../src/data/protocols/db/organization'
import { DbAddOrganization } from '../../../src/data/usecases'
import { AddOrganization } from '../../../src/domain/usecases'

const makeFakeOrganizationData = (): AddOrganization.Params => ({
  name: faker.company.companyName(),
  description: faker.company.catchPhrase()
})

const makeAddOrganizationRepository = (): AddOrganizationRepository => {
  class AddOrganizationRepositoryStub implements AddOrganizationRepository {
    async add (organizationData: AddOrganizationRepository.Params): Promise<void> {
      return new Promise(resolve => resolve(null))
    }
  }

  return new AddOrganizationRepositoryStub()
}

type SutTypes = {
  sut: DbAddOrganization
  addOrganizationRepositoryStub: AddOrganizationRepository
}

const makeSut = (): SutTypes => {
  const addOrganizationRepositoryStub = makeAddOrganizationRepository()
  const sut = new DbAddOrganization(addOrganizationRepositoryStub)

  return {
    sut,
    addOrganizationRepositoryStub
  }
}

describe('DbAddOrganization Usecase', () => {
  test('Should call AddOrganizationRepository with correct values', async () => {
    const { sut, addOrganizationRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addOrganizationRepositoryStub, 'add')

    const organizationData = makeFakeOrganizationData()
    await sut.add(organizationData)
    expect(addSpy).toHaveBeenCalledWith(organizationData)
  })

  test('Should throw if AddOrganizationRepository throws', async () => {
    const { sut, addOrganizationRepositoryStub } = makeSut()
    jest.spyOn(addOrganizationRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const organizationData = makeFakeOrganizationData()
    const promise = sut.add(organizationData)
    await expect(promise).rejects.toThrow()
  })
})
