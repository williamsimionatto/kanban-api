import { ActivateProjectMember } from '../../../../domain/usecases'

export interface ActivateProjectMemberRepository {
  activate: (params: ActivateProjectMemberRepository.Params) => Promise<void>
}

export namespace ActivateProjectMemberRepository {
  export type Params = ActivateProjectMember.Params
}
