import { ObjectId } from 'mongodb'
import { AddProjectMembersRepository, AddProjectRepository, CheckProjectByIdRepository, LoadProjectsByOrganizationRepository } from '../../../data/protocols/db/project'
import { MongoHelper } from './mongo-helper'

export class ProjectMongoRepository implements
  AddProjectRepository,
  AddProjectMembersRepository,
  CheckProjectByIdRepository,
  LoadProjectsByOrganizationRepository {
  async add (data: AddProjectRepository.Params): Promise<void> {
    const projectCollection = await MongoHelper.getCollection('projects')
    const { organizationId, ...projectdataData } = data
    await projectCollection.insertOne({
      ...projectdataData,
      organizationId: new ObjectId(organizationId)
    })
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

  async loadByOrganization (organizationId: string): Promise<LoadProjectsByOrganizationRepository.Result[]> {
    const projectCollection = await MongoHelper.getCollection('projects')
    const projects = await projectCollection
      .find({ organizationId: new ObjectId(organizationId) })
      .toArray()
    return MongoHelper.mapCollection(projects)
  }
}
