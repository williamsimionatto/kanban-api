import { AddOrganizationRepository } from '../../../../data/protocols/db/organization'
import { MongoHelper } from '../helpers'

export class OrganizationMongoRepository implements AddOrganizationRepository {
  async add (data: AddOrganizationRepository.Params): Promise<void> {
    const organizationCollection = await MongoHelper.getCollection('organizations')
    await organizationCollection.insertOne(data)
  }
}
