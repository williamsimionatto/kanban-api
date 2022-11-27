import { DbAddOrganization } from '../../../../data/usecases'
import { AddOrganization } from '../../../../domain/usecases'
import { OrganizationMongoRepository } from '../../../../infra/db/mongodb'

export const maekDbAddOrganization = (): AddOrganization => {
  const organizationMongoRepository = new OrganizationMongoRepository()
  return new DbAddOrganization(organizationMongoRepository)
}
