import { AddOrganization, CheckOrganizationById } from '../../../src/domain/usecases'

export class CheckOrganizationByIdSpy implements CheckOrganizationById {
  id: string
  result = true

  async checkById (id: string): Promise<boolean> {
    this.id = id
    return this.result
  }
}

export class AddOrganizationSpy implements AddOrganization {
  params: AddOrganization.Params

  async add (organization: AddOrganization.Params): Promise<void> {
    this.params = organization
  }
}
