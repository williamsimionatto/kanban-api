import { AddOrganizationMembers } from '../../../domain/usecases/add-organization-members'
import { AddOrganizationMembersRepository } from '../../protocols/db/organization'

export class DbAddOrganizationMembers implements AddOrganizationMembers {
  constructor (
    private readonly addOrganizationMembersRepository: AddOrganizationMembersRepository
  ) {}

  async add (data: AddOrganizationMembersRepository.Params): Promise<void> {
    await this.addOrganizationMembersRepository.addMember(data)
  }
}
