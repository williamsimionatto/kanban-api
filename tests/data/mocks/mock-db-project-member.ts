import { ActivateProjectMemberRepository, InactivateProjectMemberRepository, AddProjectMemberRepository } from '../../../src/data/protocols/db/project'

export class AddProjectMembersRepositorySpy implements AddProjectMemberRepository {
  params: AddProjectMemberRepository.Params
  result = true

  async addMember (params: AddProjectMemberRepository.Params): Promise<void> {
    this.params = params
  }
}

export class ActivateProjectMemberRepositorySpy implements ActivateProjectMemberRepository {
  params: ActivateProjectMemberRepository.Params
  result = true

  async activate (params: ActivateProjectMemberRepository.Params): Promise<void> {
    this.params = params
  }
}

export class InactivateProjectMemberRepositorySpy implements InactivateProjectMemberRepository {
  params: InactivateProjectMemberRepository.Params
  result = true

  async inactivate (params: InactivateProjectMemberRepository.Params): Promise<void> {
    this.params = params
  }
}
