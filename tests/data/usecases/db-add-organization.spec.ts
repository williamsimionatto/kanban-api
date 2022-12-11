import faker from 'faker'

import { DbAddOrganization } from '../../../src/data/usecases'
import { AddOrganization } from '../../../src/domain/usecases'
import { throwError } from '../../domain/mocks'
import { AddOrganizationRepositorySpy } from '../mocks'

const makeFakeOrganizationData = (): AddOrganization.Params => ({
  name: faker.company.companyName(),
  description: faker.company.catchPhrase()
})

type SutTypes = {
  sut: DbAddOrganization
  addOrganizationRepositorySpy: AddOrganizationRepositorySpy
}

const makeSut = (): SutTypes => {
  const addOrganizationRepositorySpy = new AddOrganizationRepositorySpy()
  const sut = new DbAddOrganization(addOrganizationRepositorySpy)

  return {
    sut,
    addOrganizationRepositorySpy
  }
}

describe('DbAddOrganization Usecase', () => {
  test('Should call AddOrganizationRepository with correct values', async () => {
    const { sut, addOrganizationRepositorySpy } = makeSut()
    const organizationData = makeFakeOrganizationData()
    await sut.add(organizationData)
    expect(addOrganizationRepositorySpy.params).toEqual(organizationData)
  })

  test('Should throw if AddOrganizationRepository throws', async () => {
    const { sut, addOrganizationRepositorySpy } = makeSut()
    jest.spyOn(addOrganizationRepositorySpy, 'add').mockImplementationOnce(throwError)
    const organizationData = makeFakeOrganizationData()
    const promise = sut.add(organizationData)
    await expect(promise).rejects.toThrow()
  })
})
