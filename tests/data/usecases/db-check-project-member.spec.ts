import faker from 'faker'
import { DbCheckProjectMember } from '../../../src/data/usecases'
import { CheckProjectMemberRepositorySpy } from '../mocks'

let projectId: string
let memberId: string

type SutTypes = {
  sut: DbCheckProjectMember
  checkProjectMemberRepositorySpy: CheckProjectMemberRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkProjectMemberRepositorySpy = new CheckProjectMemberRepositorySpy()
  const sut = new DbCheckProjectMember(checkProjectMemberRepositorySpy)
  return {
    sut,
    checkProjectMemberRepositorySpy
  }
}

describe('DbCheckProjectMember', () => {
  beforeAll(async () => {
    projectId = faker.datatype.uuid()
    memberId = faker.datatype.uuid()
  })

  test('Should call CheckProjectMemberRepository with correct values', async () => {
    const { sut, checkProjectMemberRepositorySpy } = makeSut()
    await sut.checkMember({ projectId, memberId })
    expect(checkProjectMemberRepositorySpy.params).toEqual({ projectId, memberId })
  })

  test('Should return false if CheckProjectMemberRepository returns false', async () => {
    const { sut, checkProjectMemberRepositorySpy } = makeSut()
    checkProjectMemberRepositorySpy.result = false
    const result = await sut.checkMember({ projectId, memberId })
    expect(result).toBe(false)
  })

  test('Should return true if CheckProjectMemberRepository returns true', async () => {
    const { sut } = makeSut()
    const result = await sut.checkMember({ projectId, memberId })
    expect(result).toBe(true)
  })
})
