import faker from 'faker'

import { DbAddProjectMembers } from '../../../src/data/usecases'
import { AddProjectMembers } from '../../../src/domain/usecases'
import { throwError } from '../../domain/mocks'
import { AddProjectMembersRepositorySpy } from '../mocks'

const makeFakeProjectMemberData = (): AddProjectMembers.Params => ({
  projectId: faker.datatype.uuid(),
  accountId: faker.datatype.uuid(),
  active: faker.datatype.boolean()
})

type SutTypes = {
  sut: DbAddProjectMembers
  addProjectMembersRepositorySpy: AddProjectMembersRepositorySpy
}

const makeSut = (): SutTypes => {
  const addProjectMembersRepositorySpy = new AddProjectMembersRepositorySpy()
  const sut = new DbAddProjectMembers(addProjectMembersRepositorySpy)

  return {
    sut,
    addProjectMembersRepositorySpy
  }
}

describe('DbAddProjectMembers Usecase', () => {
  test('Should call AddProjectMembersRepository with correct values', async () => {
    const { sut, addProjectMembersRepositorySpy } = makeSut()
    const projectData = makeFakeProjectMemberData()
    await sut.add(projectData)
    expect(addProjectMembersRepositorySpy.params).toEqual(projectData)
  })

  test('Should throw if AddProjectMembersRepository throws', async () => {
    const { sut, addProjectMembersRepositorySpy } = makeSut()
    jest.spyOn(addProjectMembersRepositorySpy, 'addMember').mockImplementationOnce(throwError)
    const projectData = makeFakeProjectMemberData()
    const promise = sut.add(projectData)
    await expect(promise).rejects.toThrow()
  })
})
