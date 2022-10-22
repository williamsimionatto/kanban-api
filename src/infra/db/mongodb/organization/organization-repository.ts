import { AddOrganizationRepository } from '../../../../data/protocols/db/organization'
import { MongoHelper } from '../helpers'

export class OrganizationMongoRepository implements AddOrganizationRepository {
  async add (data: AddOrganizationRepository.Params): Promise<void> {
    const projectCollection = await MongoHelper.getCollection('organizations')
    await projectCollection.insertOne(data)
  }
}
