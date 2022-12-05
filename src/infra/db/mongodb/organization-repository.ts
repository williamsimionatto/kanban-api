import { ObjectId } from 'mongodb'
import { AddOrganizationRepository } from '../../../data/protocols/db/organization'
import { CheckOrganizationById } from '../../../domain/usecases'
import { MongoHelper } from './mongo-helper'

export class OrganizationMongoRepository implements AddOrganizationRepository, CheckOrganizationById {
  async add (data: AddOrganizationRepository.Params): Promise<void> {
    const organizationCollection = await MongoHelper.getCollection('organizations')
    await organizationCollection.insertOne(data)
  }

  async checkById (id: string): Promise<CheckOrganizationById.Result> {
    const organizationCollection = await MongoHelper.getCollection('organizations')
    const organization = await organizationCollection.findOne({ _id: new ObjectId(id) }, { projection: { _id: 1 } })
    return organization !== null
  }
}
