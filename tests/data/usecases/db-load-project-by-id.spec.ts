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

  test('Should throw if LoadProjectByIdRepository throws', async () => {
    const { sut, loadProjectByIdRepositorySpy } = makeSut()
    jest.spyOn(loadProjectByIdRepositorySpy, 'loadById').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.loadById(projectId)
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadProjectByIdRepository returns null', async () => {
    const { sut, loadProjectByIdRepositorySpy } = makeSut()
    loadProjectByIdRepositorySpy.result = null
    const project = await sut.loadById(projectId)
    expect(project).toBeNull()
  })

  test('Should return a project on success', async () => {
    const { sut, loadProjectByIdRepositorySpy } = makeSut()
    const project = await sut.loadById(projectId)
    expect(project).toEqual(loadProjectByIdRepositorySpy.result)
  })
})
