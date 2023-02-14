import faker from 'faker'
import { DbAddProjectPhase } from '../../../src/data/usecases'

import { AddProjectPhase } from '../../../src/domain/usecases'
import { throwError } from '../../domain/mocks'
import { AddProjectPhaseRepositorySpy } from '../mocks'

const makeFakeProjectPhaseData = (): AddProjectPhase.Params => ({
  projectId: faker.datatype.uuid(),
  name: faker.name.title(),
  description: faker.lorem.paragraph(),
  order: faker.datatype.number(),
  type: faker.random.arrayElement(['BACKLOG', 'TODO', 'DOING', 'BLOCKED', 'REVIEW', 'DONE'])
})

type SutTypes = {
  sut: DbAddProjectPhase
  addProjectPhaseRepositorySpy: AddProjectPhaseRepositorySpy
}

const makeSut = (): SutTypes => {
  const addProjectPhaseRepositorySpy = new AddProjectPhaseRepositorySpy()
  const sut = new DbAddProjectPhase(addProjectPhaseRepositorySpy)

  return {
    sut,
    addProjectPhaseRepositorySpy
  }
}

describe('DbAddProjectPhase Usecase', () => {
  test('Should call AddProjectPhaseRepository with correct values', async () => {
    const { sut, addProjectPhaseRepositorySpy } = makeSut()
    const projectPhaseData = makeFakeProjectPhaseData()
    await sut.add(projectPhaseData)
    expect(addProjectPhaseRepositorySpy.params).toEqual(projectPhaseData)
  })

  test('Should throw if AddProjectMembersRepository throws', async () => {
    const { sut, addProjectPhaseRepositorySpy } = makeSut()
    jest.spyOn(addProjectPhaseRepositorySpy, 'add').mockImplementationOnce(throwError)
    const projectPhaseData = makeFakeProjectPhaseData()
    const promise = sut.add(projectPhaseData)
    await expect(promise).rejects.toThrow()
  })
})
