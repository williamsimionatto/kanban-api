import { AddProjectMembers } from '../../domain/usecases/add-project-members'
import { AddProjectMemberRepository } from '../protocols/db/project'

export class DbAddProjectMembers implements AddProjectMembers {
  constructor (
    private readonly addProjectMembersRepository: AddProjectMemberRepository
  ) {}

  async add (data: AddProjectMemberRepository.Params): Promise<void> {
    await this.addProjectMembersRepository.addMember(data)
  }
}
