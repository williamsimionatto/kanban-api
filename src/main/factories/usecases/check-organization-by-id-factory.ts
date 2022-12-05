import { DbCheckOrganizationById } from '../../../data/usecases'
import { CheckOrganizationById } from '../../../domain/usecases'
import { OrganizationMongoRepository } from '../../../infra/db/mongodb'

export const makeDbCheckOrganizationById = (): CheckOrganizationById => {
  const organizationMongoRepository = new OrganizationMongoRepository()
  return new DbCheckOrganizationById(organizationMongoRepository)
}
