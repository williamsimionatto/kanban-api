import { ActivateProjectMember, InactivateProjectMember } from '../../../src/domain/usecases'

export class ActivateProjectMemberSpy implements ActivateProjectMember {
  params: ActivateProjectMember.Params

  async activate (params: ActivateProjectMember.Params): Promise<void> {
    this.params = params
  }
}

export class InactivateProjectMemberSpy implements InactivateProjectMember {
  params: ActivateProjectMember.Params

  async inactivate (params: ActivateProjectMember.Params): Promise<void> {
    this.params = params
  }
}
