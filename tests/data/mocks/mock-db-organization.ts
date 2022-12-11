import { AddOrganizationRepository, CheckOrganizationByIdRepository } from '../../../src/data/protocols/db/organization'

export class CheckOrganizationByIdRepositorySpy implements CheckOrganizationByIdRepository {
  id: string
  result = true

  async checkById (id: string): Promise<CheckOrganizationByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class AddOrganizationRepositorySpy implements AddOrganizationRepository {
  params: AddOrganizationRepository.Params
  result = true

  async add (params: AddOrganizationRepository.Params): Promise<void> {
    this.params = params
  }
}
