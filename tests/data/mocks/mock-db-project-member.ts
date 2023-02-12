import { ActivateProjectMemberRepository } from '../../../src/data/protocols/db/project'

export class ActivateProjectMemberRepositorySpy implements ActivateProjectMemberRepository {
  params: ActivateProjectMemberRepository.Params
  result = true

  async activate (params: ActivateProjectMemberRepository.Params): Promise<void> {
    this.params = params
  }
}
