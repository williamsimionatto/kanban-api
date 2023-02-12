import { ActivateProjectMember } from '../../domain/usecases'
import { ActivateProjectMemberRepository } from '../protocols/db/project'

export class DbActivateProjectMember implements ActivateProjectMember {
  constructor (
    private readonly activateProjectMemberRepository: ActivateProjectMemberRepository
  ) {}

  async activate (params: ActivateProjectMember.Params): Promise<void> {
    await this.activateProjectMemberRepository.activate(params)
  }
}
