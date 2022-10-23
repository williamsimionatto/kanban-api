import { AddOrganization } from '../../../../domain/usecases'

export interface AddOrganizationRepository {
  add: (organization: AddOrganizationRepository.Params) => Promise<void>
}

export namespace AddOrganizationRepository {
  export type Params = AddOrganization.Params
}
