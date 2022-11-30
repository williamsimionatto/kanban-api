import { AddProject } from '../../../src/domain/usecases'

import faker from 'faker'
import { DbAddProject } from '../../../src/data/usecases/'
import { AddProjectRepository } from '../../../src/data/protocols/db/project'

const mockAddProjectParams = (): AddProject.Params => ({
  name: faker.name.firstName(),
  description: faker.random.words(),
  status: faker.random.arrayElement(['active', 'inactive']),
  startDate: faker.date.recent(),
  endDate: faker.date.future(),
  organizationId: faker.datatype.uuid()
})

const makeAddProjectRepositoryStub = (): AddProjectRepository => {
  class AddProjectRepositoryStub implements AddProjectRepository {
    async add (data: AddProject.Params): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new AddProjectRepositoryStub()
}

type SutTypes = {
  sut: DbAddProject
  addProjectRepositoryStub: AddProjectRepository
}

const makeSut = (): SutTypes => {
  const addProjectRepositoryStub = makeAddProjectRepositoryStub()
  const sut = new DbAddProject(addProjectRepositoryStub)
  return {
    sut,
    addProjectRepositoryStub
  }
}

describe('DbAddProject UseCase', () => {
  test('Should call AddProjectRespository with correct values', async () => {
    const { sut, addProjectRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addProjectRepositoryStub, 'add')
    const projectParams = mockAddProjectParams()
    await sut.add(projectParams)
    expect(addSpy).toHaveBeenCalledWith(projectParams)
  })

  test('Should throw if AddProjectRespository thorws', async () => {
    const { sut, addProjectRepositoryStub } = makeSut()
    jest.spyOn(addProjectRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const projectParams = mockAddProjectParams()
    const account = sut.add(projectParams)
    await expect(account).rejects.toThrow()
  })
})
