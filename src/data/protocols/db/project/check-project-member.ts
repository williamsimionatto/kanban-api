import { CheckProjectMember } from '../../../../domain/usecases'

export interface CheckProjectMemberRepository {
  checkMember: (params: CheckProjectMemberRepository.Params) => Promise<CheckProjectMemberRepository.Result>
}

export namespace CheckProjectMemberRepository {
  export type Params = CheckProjectMember.Params
  export type Result = boolean
}
