import faker from 'faker'
import { DbAddProjectPhase } from '../../../src/data/usecases'

import { AddProjectPhase } from '../../../src/domain/usecases'
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
    const projectData = makeFakeProjectPhaseData()
    await sut.add(projectData)
    expect(addProjectPhaseRepositorySpy.params).toEqual(projectData)
  })
})
