import { AddOrganization } from '../../../../domain/usecases'

export interface AddOrganizationRepository {
  add: (organization: AddOrganizationRepository.Params) => Promise<AddOrganizationRepository.Result>
}

export namespace AddOrganizationRepository {
  export type Params = AddOrganization.Params
  export type Result = boolean
}
