import { InactivateProjectMember } from '../../../../domain/usecases'

export interface InactivateProjectMemberRepository {
  inactivate: (params: InactivateProjectMemberRepository.Params) => Promise<void>
}

export namespace InactivateProjectMemberRepository {
  export type Params = InactivateProjectMember.Params
}
