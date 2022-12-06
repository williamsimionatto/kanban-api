import { CheckProjectMember } from '../../domain/usecases'
import { CheckProjectMemberRepository } from '../protocols/db/project'

export class DbCheckProjectMember implements CheckProjectMember {
  constructor (private readonly checkProjectMemberRepository: CheckProjectMemberRepository) {}

  async checkMember (params: CheckProjectMember.Params): Promise<CheckProjectMember.Result> {
    await this.checkProjectMemberRepository.checkMember(params)
    return null
  }
}
