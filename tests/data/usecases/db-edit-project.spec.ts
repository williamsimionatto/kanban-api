import faker from 'faker'
import { DbEditProject } from '../../../src/data/usecases'
import { EditProject } from '../../../src/domain/usecases'
import { throwError } from '../../domain/mocks'
import { EditProjectRepositorySpy } from '../mocks'

const mockEditProjectParams = (): EditProject.Params => ({
  id: faker.datatype.uuid(),
  name: faker.name.firstName(),
  description: faker.random.words(),
  status: faker.random.arrayElement(['active', 'inactive']),
  startDate: faker.date.recent(),
  endDate: faker.date.future(),
  organizationId: faker.datatype.uuid()
})

type SutTypes = {
  sut: DbEditProject
  editProjectRepositorySpy: EditProjectRepositorySpy
}

const makeSut = (): SutTypes => {
  const editProjectRepositorySpy = new EditProjectRepositorySpy()
  const sut = new DbEditProject(editProjectRepositorySpy)
  return {
    sut,
    editProjectRepositorySpy
  }
}

describe('DbEditProject UseCase', () => {
  test('Should call EditProjectRepository with correct values', async () => {
    const { sut, editProjectRepositorySpy } = makeSut()
    const projectParams = mockEditProjectParams()
    await sut.edit(projectParams)
    expect(editProjectRepositorySpy.params).toEqual(projectParams)
  })

  test('Should throw if EditProjectRepository throws', async () => {
    const { sut, editProjectRepositorySpy } = makeSut()
    jest.spyOn(editProjectRepositorySpy, 'edit').mockImplementationOnce(throwError)
    const projectParams = mockEditProjectParams()
    const account = sut.edit(projectParams)
    await expect(account).rejects.toThrow()
  })
})
