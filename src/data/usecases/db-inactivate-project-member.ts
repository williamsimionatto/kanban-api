import { ActivateProjectMember, InactivateProjectMember } from '../../domain/usecases'
import { InactivateProjectMemberRepository } from '../protocols/db/project'

export class DbInactivateProjectMember implements InactivateProjectMember {
  constructor (
    private readonly activateProjectMemberRepository: InactivateProjectMemberRepository
  ) {}

  async inactivate (params: ActivateProjectMember.Params): Promise<void> {
    await this.activateProjectMemberRepository.inactivate(params)
  }
}
