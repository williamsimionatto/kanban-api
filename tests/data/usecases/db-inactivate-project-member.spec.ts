import faker from 'faker'
import { DbInactivateProjectMember } from '../../../src/data/usecases'

import { ActivateProjectMember, InactivateProjectMember } from '../../../src/domain/usecases'
import { InactivateProjectMemberRepositorySpy } from '../mocks'

const makeFakeData = (): ActivateProjectMember.Params => ({
  projectId: faker.datatype.uuid(),
  accountId: faker.datatype.uuid()
})

interface SutTypes {
  sut: InactivateProjectMember
  inactivateProjectMemberRepositorySpy: InactivateProjectMemberRepositorySpy
}

const makeSut = (): SutTypes => {
  const inactivateProjectMemberRepositorySpy = new InactivateProjectMemberRepositorySpy()
  const sut = new DbInactivateProjectMember(inactivateProjectMemberRepositorySpy)
  return {
    sut,
    inactivateProjectMemberRepositorySpy
  }
}

describe('DbInactivateProjectMember Usecase', () => {
  test('Should call InactivateProjectMemberRepository with correct values', async () => {
    const { sut, inactivateProjectMemberRepositorySpy } = makeSut()
    const activateSpy = jest.spyOn(inactivateProjectMemberRepositorySpy, 'inactivate')
    const params = makeFakeData()
    await sut.inactivate(params)
    expect(activateSpy).toHaveBeenCalledWith(params)
  })

  test('Should throw if InactivateProjectMemberRepository throws', async () => {
    const { sut, inactivateProjectMemberRepositorySpy } = makeSut()
    jest.spyOn(inactivateProjectMemberRepositorySpy, 'inactivate').mockRejectedValueOnce(new Error())
    const promise = sut.inactivate(makeFakeData())
    await expect(promise).rejects.toThrow()
  })
})
