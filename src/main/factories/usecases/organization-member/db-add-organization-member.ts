import { DbAddOrganizationMembers } from '../../../../data/usecases/add-organization-members'
import { AddOrganizationMembers } from '../../../../domain/usecases'
import { OrganizationMongoRepository } from '../../../../infra/db/mongodb'

export const makeDbAddOrganizationMembers = (): AddOrganizationMembers => {
  const addOrganizationMembersRepository = new OrganizationMongoRepository()
  return new DbAddOrganizationMembers(addOrganizationMembersRepository)
}
