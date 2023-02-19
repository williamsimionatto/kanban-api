import faker from 'faker'
import { DbCheckProjectPhase } from '../../../src/data/usecases'
import { PhaseType } from '../../../src/domain/usecases'
import { CheckProjectPhaseRepositorySpy } from '../mocks'

let projectId: string
let phaseType: PhaseType

type SutTypes = {
  sut: DbCheckProjectPhase
  checkProjectPhaseRepositorySpy: CheckProjectPhaseRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkProjectPhaseRepositorySpy = new CheckProjectPhaseRepositorySpy()
  const sut = new DbCheckProjectPhase(checkProjectPhaseRepositorySpy)

  return {
    sut,
    checkProjectPhaseRepositorySpy
  }
}

describe('DbCheckProjectPhase', () => {
  beforeAll(async () => {
    projectId = faker.datatype.uuid()
    phaseType = faker.random.arrayElement(['BACKLOG', 'TODO', 'DOING', 'BLOCKED', 'REVIEW', 'DONE'])
  })

  test('Should call CheckProjectPhaseRepository with correct values', async () => {
    const { sut, checkProjectPhaseRepositorySpy } = makeSut()
    await sut.check({ projectId, phaseType })
    expect(checkProjectPhaseRepositorySpy.params).toEqual({ projectId, phaseType })
  })

  test('Should throw if CheckProjectPhaseRepository throws', async () => {
    const { sut, checkProjectPhaseRepositorySpy } = makeSut()
    jest.spyOn(checkProjectPhaseRepositorySpy, 'checkPhase').mockRejectedValueOnce(new Error())
    const promise = sut.check({ projectId, phaseType })
    await expect(promise).rejects.toThrow()
  })

  test('Should return false if CheckProjectPhaseRepository returns false', async () => {
    const { sut, checkProjectPhaseRepositorySpy } = makeSut()
    checkProjectPhaseRepositorySpy.result = false
    const result = await sut.check({ projectId, phaseType })
    expect(result).toBe(false)
  })

  test('Should return true if CheckProjectPhaseRepository returns true', async () => {
    const { sut } = makeSut()
    const result = await sut.check({ projectId, phaseType })
    expect(result).toBe(true)
  })
})
