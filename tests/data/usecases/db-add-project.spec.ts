import faker from 'faker'

import { AddProject } from '../../../src/domain/usecases'
import { DbAddProject } from '../../../src/data/usecases/'

import { throwError } from '../../domain/mocks'
import { AddProjectRepositorySpy } from '../mocks'

const mockAddProjectParams = (): AddProject.Params => ({
  name: faker.name.firstName(),
  description: faker.random.words(),
  status: faker.random.arrayElement(['active', 'inactive']),
  startDate: faker.date.recent(),
  endDate: faker.date.future(),
  organizationId: faker.datatype.uuid()
})

type SutTypes = {
  sut: DbAddProject
  addProjectRepositorySpy: AddProjectRepositorySpy
}

const makeSut = (): SutTypes => {
  const addProjectRepositorySpy = new AddProjectRepositorySpy()
  const sut = new DbAddProject(addProjectRepositorySpy)
  return {
    sut,
    addProjectRepositorySpy
  }
}

describe('DbAddProject UseCase', () => {
  test('Should call AddProjectRespository with correct values', async () => {
    const { sut, addProjectRepositorySpy } = makeSut()
    const projectParams = mockAddProjectParams()
    await sut.add(projectParams)
    expect(addProjectRepositorySpy.params).toEqual(projectParams)
  })

  test('Should throw if AddProjectRespository thorws', async () => {
    const { sut, addProjectRepositorySpy } = makeSut()
    jest.spyOn(addProjectRepositorySpy, 'add').mockImplementationOnce(throwError)
    const projectParams = mockAddProjectParams()
    const account = sut.add(projectParams)
    await expect(account).rejects.toThrow()
  })
})
