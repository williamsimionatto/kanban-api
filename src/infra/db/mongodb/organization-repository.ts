import { AddOrganizationRepository } from '../../../data/protocols/db/organization'
import { MongoHelper } from './mongo-helper'

export class OrganizationMongoRepository implements AddOrganizationRepository {
  async add (data: AddOrganizationRepository.Params): Promise<void> {
    const organizationCollection = await MongoHelper.getCollection('organizations')
    await organizationCollection.insertOne(data)
  }
}
