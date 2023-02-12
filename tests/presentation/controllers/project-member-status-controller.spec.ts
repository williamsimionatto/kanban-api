import faker from 'faker'
import { ProjectMemberStatusController } from '../../../src/presentation/controllers'
import { badRequest } from '../../../src/presentation/helpers'
import { ActivateProjectMemberSpy, InactivateProjectMemberSpy, ValidationSpy } from '../mocks'

const makeFakeRequest = (): ProjectMemberStatusController.Request => ({
  accountId: faker.datatype.uuid(),
  projectId: faker.datatype.uuid(),
  active: faker.datatype.boolean()
})

type SutTypes = {
  sut: ProjectMemberStatusController
  validationSpy: ValidationSpy
  activateProjectMemberSpy: ActivateProjectMemberSpy
  inactivateProjectMemberSpy: InactivateProjectMemberSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const activateProjectMemberSpy = new ActivateProjectMemberSpy()
  const inactivateProjectMemberSpy = new InactivateProjectMemberSpy()
  const sut = new ProjectMemberStatusController(validationSpy, activateProjectMemberSpy, inactivateProjectMemberSpy)

  return {
    sut,
    validationSpy,
    activateProjectMemberSpy,
    inactivateProjectMemberSpy
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

  test('Should call InactivateProjectMember with correct values when active is false', async () => {
    const { sut, inactivateProjectMemberSpy } = makeSut()
    const request = makeFakeRequest()
    request.active = false
    await sut.handle(request)
    expect(inactivateProjectMemberSpy.params).toEqual({
      accountId: request.accountId,
      projectId: request.projectId
    })
  })
})
