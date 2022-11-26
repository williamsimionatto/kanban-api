import { AddProjectMembers } from '../../../../domain/usecases'

export interface AddProjectMembersRepository {
  addMember: (data: AddProjectMembersRepository.Params) => Promise<void>
}

export namespace AddProjectMembersRepository {
  export type Params = AddProjectMembers.Params
}
