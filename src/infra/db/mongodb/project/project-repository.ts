import { ObjectId } from 'mongodb'
import { AddProjectMembersRepository, AddProjectRepository } from '../../../../data/protocols/db/project'
import { MongoHelper } from '../helpers'

export class ProjectMongoRepository implements AddProjectRepository, AddProjectMembersRepository {
  async add (data: AddProjectRepository.Params): Promise<void> {
    const projectCollection = await MongoHelper.getCollection('projects')
    await projectCollection.insertOne(data)
  }

  async addMember (data: AddProjectMembersRepository.Params): Promise<void> {
    const organizationCollection = await MongoHelper.getCollection('projects')
    await organizationCollection.updateOne({
      _id: new ObjectId(data.projectId)
    }, {
      $push: {
        members: new ObjectId(data.accountId)
      }
    })
  }
}
