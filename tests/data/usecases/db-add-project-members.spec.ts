import { AddProjectMembersRepository } from '../../../src/data/protocols/db/project'
import { DbAddProjectMembers } from '../../../src/data/usecases'
import { AddProjectMembers } from '../../../src/domain/usecases'

const makeFakeProjectMemberData = (): AddProjectMembers.Params => ({
  projectId: 'any_project_id',
  accountId: 'any_account_id'
})

const makeAddProjectMembersRepository = (): AddProjectMembersRepository => {
  class AddProjectMembersRepositoryStub implements AddProjectMembersRepository {
    async addMember (data: AddProjectMembersRepository.Params): Promise<void> {
      return new Promise(resolve => resolve(null))
    }
  }

  return new AddProjectMembersRepositoryStub()
}

type SutTypes = {
  sut: DbAddProjectMembers
  addProjectMembersRepositoryStub: AddProjectMembersRepository
}

const makeSut = (): SutTypes => {
  const addProjectMembersRepositoryStub = makeAddProjectMembersRepository()
  const sut = new DbAddProjectMembers(addProjectMembersRepositoryStub)

  return {
    sut,
    addProjectMembersRepositoryStub
  }
}

describe('DbAddProjectMembers Usecase', () => {
  test('Should call AddProjectMembersRepository with correct values', async () => {
    const { sut, addProjectMembersRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addProjectMembersRepositoryStub, 'addMember')

    const projectData = makeFakeProjectMemberData()
    await sut.add(projectData)
    expect(addSpy).toHaveBeenCalledWith(projectData)
  })

  test('Should throw if AddProjectMembersRepository throws', async () => {
    const { sut, addProjectMembersRepositoryStub } = makeSut()
    jest.spyOn(addProjectMembersRepositoryStub, 'addMember').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const projectData = makeFakeProjectMemberData()
    const promise = sut.add(projectData)
    await expect(promise).rejects.toThrow()
  })
})
