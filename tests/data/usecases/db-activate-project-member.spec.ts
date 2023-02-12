import faker from 'faker'
import { DbActivateProjectMember } from '../../../src/data/usecases'

import { ActivateProjectMember } from '../../../src/domain/usecases'
import { ActivateProjectMemberRepositorySpy } from '../mocks'

const makeFakeData = (): ActivateProjectMember.Params => ({
  projectId: faker.datatype.uuid(),
  accountId: faker.datatype.uuid()
})

interface SutTypes {
  sut: ActivateProjectMember
  activateProjectMemberRepositorySpy: ActivateProjectMemberRepositorySpy
}

const makeSut = (): SutTypes => {
  const activateProjectMemberRepositorySpy = new ActivateProjectMemberRepositorySpy()
  const sut = new DbActivateProjectMember(activateProjectMemberRepositorySpy)
  return {
    sut,
    activateProjectMemberRepositorySpy
  }
}

describe('DbActivateProjectMember Usecase', () => {
  test('Should call ActivateProjectMemberRepository with correct values', async () => {
    const { sut, activateProjectMemberRepositorySpy } = makeSut()
    const activateSpy = jest.spyOn(activateProjectMemberRepositorySpy, 'activate')
    const params = makeFakeData()
    await sut.activate(params)
    expect(activateSpy).toHaveBeenCalledWith(params)
  })

  test('Should throw if ActivateProjectMemberRepository throws', async () => {
    const { sut, activateProjectMemberRepositorySpy } = makeSut()
    jest.spyOn(activateProjectMemberRepositorySpy, 'activate').mockRejectedValueOnce(new Error())
    const promise = sut.activate(makeFakeData())
    await expect(promise).rejects.toThrow()
  })
})
