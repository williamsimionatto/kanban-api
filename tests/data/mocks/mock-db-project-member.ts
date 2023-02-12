import { ActivateProjectMemberRepository, InactivateProjectMemberRepository } from '../../../src/data/protocols/db/project'

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
