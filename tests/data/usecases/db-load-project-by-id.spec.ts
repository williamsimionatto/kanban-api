import FakeObjectId from 'bson-objectid'
import MockDate from 'mockdate'

import { DbLoadProjectById } from '../../../src/data/usecases'
import { LoadProjectByIdRepositorySpy } from '../mocks'

type SutTypes = {
  sut: DbLoadProjectById
  loadProjectByIdRepositorySpy: LoadProjectByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadProjectByIdRepositorySpy = new LoadProjectByIdRepositorySpy()
  const sut = new DbLoadProjectById(loadProjectByIdRepositorySpy)

  return {
    sut,
    loadProjectByIdRepositorySpy
  }
}

let projectId: string

describe('DbLoadProjectById Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    projectId = new FakeObjectId().toHexString()
  })

  test('Should call LoadProjectByIdRepository with correct values', async () => {
    const { sut, loadProjectByIdRepositorySpy } = makeSut()
    await sut.loadById(projectId)
    expect(loadProjectByIdRepositorySpy.id).toBe(projectId)
  })
})
