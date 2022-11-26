import { AddOrganizationMembers } from '../../../../domain/usecases/add-organization-members'

export interface AddOrganizationMembersRepository {
  add: (data: AddOrganizationMembersRepository.Params) => Promise<void>
}

export namespace AddOrganizationMembersRepository {
  export type Params = AddOrganizationMembers.Params
}
