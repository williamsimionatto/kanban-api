import faker from 'faker'
import { DbCheckProjectById } from '../../../src/data/usecases/db-check-project-by-id'
import { CheckProjectByIdRepositorySpy } from '../mocks'

let projectId: string

type SutTypes = {
  sut: DbCheckProjectById
  checkProjectByIdRepositorySpy: CheckProjectByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkProjectByIdRepositorySpy = new CheckProjectByIdRepositorySpy()
  const sut = new DbCheckProjectById(checkProjectByIdRepositorySpy)
  return {
    sut,
    checkProjectByIdRepositorySpy
  }
}

describe('DbCheckSurveyById', () => {
  beforeAll(async () => {
    projectId = faker.datatype.uuid()
  })

  test('Should call CheckProjectByIdRepository with correct values', async () => {
    const { sut, checkProjectByIdRepositorySpy } = makeSut()
    await sut.checkById(projectId)
    expect(checkProjectByIdRepositorySpy.id).toBe(projectId)
  })
})
