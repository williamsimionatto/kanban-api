import { AddProjectMembers } from '../../../domain/usecases/add-project-members'
import { AddProjectMembersRepository } from '../../protocols/db/project'

export class DbAddProjectMembers implements AddProjectMembers {
  constructor (
    private readonly addProjectMembersRepository: AddProjectMembersRepository
  ) {}

  async add (data: AddProjectMembersRepository.Params): Promise<void> {
    await this.addProjectMembersRepository.addMember(data)
  }
}
