import faker from 'faker'
import { DbAddSprint } from '../../../src/data/usecases'

import { AddSprint } from '../../../src/domain/usecases'
import { throwError } from '../../domain/mocks'
import { AddSprintRepositorySpy } from '../mocks'

const mockAddSprintParams = (): AddSprint.Params => ({
  name: faker.name.firstName(),
  objective: faker.random.words(),
  startDate: faker.date.recent(),
  endDate: faker.date.future(),
  projectId: faker.datatype.uuid()
})

type SutTypes = {
  sut: AddSprint
  addSprintRepositorySpy: AddSprintRepositorySpy
}

const makeSut = (): SutTypes => {
  const addSprintRepositorySpy = new AddSprintRepositorySpy()
  const sut = new DbAddSprint(addSprintRepositorySpy)

  return {
    sut,
    addSprintRepositorySpy
  }
}

describe('DbAddSprint UseCase', () => {
  test('Should call AddSprintRepository with correct values', async () => {
    const { sut, addSprintRepositorySpy } = makeSut()
    const sprintParams = mockAddSprintParams()
    await sut.add(sprintParams)
    expect(addSprintRepositorySpy.params).toEqual(sprintParams)
  })

  test('Should throw if AddSprintRepository throws', async () => {
    const { sut, addSprintRepositorySpy } = makeSut()
    jest.spyOn(addSprintRepositorySpy, 'add').mockImplementationOnce(throwError)
    const sprintParams = mockAddSprintParams()
    const sprint = sut.add(sprintParams)
    await expect(sprint).rejects.toThrow()
  })
})
