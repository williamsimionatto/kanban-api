import { AddProject } from '../../../../src/domain/usecases'

import faker from 'faker'
import { DbAddProject } from '../../../../src/data/usecases/project'
import { AddProjectRepository } from '../../../../src/data/protocols/db/project'

const mockAddProjectParams = (): AddProject.Params => ({
  name: faker.name.firstName(),
  description: faker.random.words(),
  status: faker.random.arrayElement(['active', 'inactive']),
  startDate: faker.date.recent(),
  endDate: faker.date.future()
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
})
