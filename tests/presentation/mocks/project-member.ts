import { ActivateProjectMember } from '../../../src/domain/usecases'

export class ActivateProjectMemberSpy implements ActivateProjectMember {
  activateMember = false
  activateMemberParams: ActivateProjectMember.Params

  async activate (params: ActivateProjectMember.Params): Promise<void> {
    this.activateMember = true
    this.activateMemberParams = params
  }
}
