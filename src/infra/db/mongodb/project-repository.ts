import { ObjectId } from 'mongodb'
import {
  AddProjectMembersRepository,
  AddProjectRepository,
  CheckProjectByIdRepository,
  CheckProjectMemberRepository,
  LoadProjectsByOrganizationRepository,
  LoadProjectByIdRepository,
  EditProjectRepository
} from '../../../data/protocols/db/project'

import { MongoHelper } from './mongo-helper'
import { QueryBuilder } from './query-builder'

export class ProjectMongoRepository implements
  AddProjectRepository,
  AddProjectMembersRepository,
  CheckProjectByIdRepository,
  LoadProjectsByOrganizationRepository,
  CheckProjectMemberRepository,
  LoadProjectByIdRepository,
  EditProjectRepository {
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

  async checkMember (data: CheckProjectMemberRepository.Params): Promise<CheckProjectMemberRepository.Result> {
    const projectCollection = await MongoHelper.getCollection('projects')
    const project = await projectCollection.findOne(
      {
        _id: new ObjectId(data.projectId),
        members: { $in: [new ObjectId(data.memberId)] }
      }, { projection: { _id: 1 } })

    return project !== null
  }

  async loadById (id: string): Promise<LoadProjectByIdRepository.Result> {
    const projectCollection = await MongoHelper.getCollection('projects')
    const query = new QueryBuilder()
      .match({ _id: new ObjectId(id) })
      .lookup({
        from: 'accounts',
        localField: 'members',
        foreignField: '_id',
        as: 'members'
      })
      .project({
        _id: 1,
        name: 1,
        description: 1,
        status: 1,
        startDate: 1,
        endDate: 1,
        'members._id': 1,
        'members.name': 1,
        'members.email': 1
      })
      .build()

    const projectData = await projectCollection.aggregate(query).toArray()
    const project = projectData.length
      ? {
          ...MongoHelper.map(projectData[0]),
          members: MongoHelper.mapCollection(projectData[0].members)
        }
      : null

    return project
  }

  async edit (data: EditProjectRepository.Params): Promise<void> {
    const projectCollection = await MongoHelper.getCollection('projects')
    const { id, ...projectData } = data
    await projectCollection.updateOne({
      _id: new ObjectId(id)
    }, {
      $set: {
        ...projectData
      }
    })
  }
}
