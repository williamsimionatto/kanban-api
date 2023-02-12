import faker from 'faker'
import { ProjectMemberStatusController } from '../../../src/presentation/controllers'
import { badRequest } from '../../../src/presentation/helpers'
import { ActivateProjectMemberSpy, ValidationSpy } from '../mocks'

const makeFakeRequest = (): ProjectMemberStatusController.Request => ({
  accountId: faker.datatype.uuid(),
  projectId: faker.datatype.uuid(),
  active: faker.datatype.boolean()
})

type SutTypes = {
  sut: ProjectMemberStatusController
  validationSpy: ValidationSpy
  activateProjectMemberSpy: ActivateProjectMemberSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const activateProjectMemberSpy = new ActivateProjectMemberSpy()
  const sut = new ProjectMemberStatusController(validationSpy, activateProjectMemberSpy)
  return {
    sut,
    validationSpy,
    activateProjectMemberSpy
  }
}

describe('ProjectMemberStatus Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call ActivateProjectMember with correct values when active is true', async () => {
    const { sut, activateProjectMemberSpy } = makeSut()
    const request = makeFakeRequest()
    request.active = true
    await sut.handle(request)
    expect(activateProjectMemberSpy.params).toEqual({
      accountId: request.accountId,
      projectId: request.projectId
    })
  })
})
