import { ObjectId } from 'mongodb'
import { AddProjectMembersRepository, AddProjectRepository, CheckProjectByIdRepository } from '../../../../data/protocols/db/project'
import { MongoHelper } from '../helpers'

export class ProjectMongoRepository implements AddProjectRepository, AddProjectMembersRepository, CheckProjectByIdRepository {
  async add (data: AddProjectRepository.Params): Promise<void> {
    const projectCollection = await MongoHelper.getCollection('projects')
    await projectCollection.insertOne(data)
  }

  async addMember (data: AddProjectMembersRepository.Params): Promise<void> {
    const organizationCollection = await MongoHelper.getCollection('projects')

    await organizationCollection.updateOne({
      _id: new ObjectId(data.projectId)
    }, {
      $addToSet: {
        members: new ObjectId(data.accountId)
      }
    })
  }

  async checkById (id: string): Promise<CheckProjectByIdRepository.Result> {
    const projectCollection = await MongoHelper.getCollection('projects')
    const project = await projectCollection.findOne({ _id: new ObjectId(id) }, { projection: { _id: 1 } })
    return project !== null
  }
}
