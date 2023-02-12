import { AddProjectMembers } from '../../../../domain/usecases'

export interface AddProjectMemberRepository {
  addMember: (data: AddProjectMemberRepository.Params) => Promise<void>
}

export namespace AddProjectMemberRepository {
  export type Params = AddProjectMembers.Params
}
