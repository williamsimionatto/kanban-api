import { AddOrganizationMembers } from '../../../../domain/usecases/'

export interface AddOrganizationMembersRepository {
  addMember: (data: AddOrganizationMembersRepository.Params) => Promise<void>
}

export namespace AddOrganizationMembersRepository {
  export type Params = AddOrganizationMembers.Params
}
