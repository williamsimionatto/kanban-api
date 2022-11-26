import { AddOrganizationMembersRepository } from '../../../../src/data/protocols/db/organization'
import { DbAddOrganizationMembers } from '../../../../src/data/usecases/add-organization-members'
import { AddOrganizationMembers } from '../../../../src/domain/usecases/add-organization-members'

const makeFakeOrganizationData = (): AddOrganizationMembers.Params => ({
  organizationId: 'any_organization_id',
  accountId: 'any_account_id'
})

const makeAddOrganizationMembersRepository = (): AddOrganizationMembersRepository => {
  class AddOrganizationMembersRepositoryStub implements AddOrganizationMembersRepository {
    async add (data: AddOrganizationMembersRepository.Params): Promise<void> {
      return new Promise(resolve => resolve(null))
    }
  }

  return new AddOrganizationMembersRepositoryStub()
}

type SutTypes = {
  sut: DbAddOrganizationMembers
  addOrganizationMembersRepositoryStub: AddOrganizationMembersRepository
}

const makeSut = (): SutTypes => {
  const addOrganizationMembersRepositoryStub = makeAddOrganizationMembersRepository()
  const sut = new DbAddOrganizationMembers(addOrganizationMembersRepositoryStub)

  return {
    sut,
    addOrganizationMembersRepositoryStub
  }
}

describe('DbAddOrganizationMembers Usecase', () => {
  test('Should call AddOrganizationMembersRepository with correct values', async () => {
    const { sut, addOrganizationMembersRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addOrganizationMembersRepositoryStub, 'add')

    const organizationData = makeFakeOrganizationData()
    await sut.add(organizationData)
    expect(addSpy).toHaveBeenCalledWith(organizationData)
  })
})
