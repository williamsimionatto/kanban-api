import { ObjectId } from 'mongodb'
import { AddOrganizationMembersRepository, AddOrganizationRepository } from '../../../../data/protocols/db/organization'
import { MongoHelper } from '../helpers'

export class OrganizationMongoRepository implements AddOrganizationRepository, AddOrganizationMembersRepository {
  async add (data: AddOrganizationRepository.Params): Promise<void> {
    const organizationCollection = await MongoHelper.getCollection('organizations')
    await organizationCollection.insertOne(data)
  }

  async addMember (data: AddOrganizationMembersRepository.Params): Promise<void> {
    const organizationCollection = await MongoHelper.getCollection('organizations')
    await organizationCollection.updateOne({
      _id: new ObjectId(data.organizationId)
    }, {
      $push: {
        members: new ObjectId(data.accountId)
      }
    })
  }
}
