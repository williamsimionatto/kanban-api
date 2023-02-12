import { ObjectId } from 'mongodb'

import {
  AddProjectMemberRepository,
  CheckProjectMemberRepository
} from '../../../data/protocols/db/project'

import { MongoHelper } from './mongo-helper'

export class ProjectMemberMongoRepository implements
  AddProjectMemberRepository,
  CheckProjectMemberRepository {
  async addMember (data: AddProjectMemberRepository.Params): Promise<void> {
    const organizationCollection = await MongoHelper.getCollection('projects')

    await organizationCollection.updateOne({
      _id: new ObjectId(data.projectId)
    }, {
      $addToSet: {
        members: new ObjectId(data.accountId)
      }
    })
  }

  async checkMember (data: CheckProjectMemberRepository.Params): Promise<CheckProjectMemberRepository.Result> {
    const projectCollection = await MongoHelper.getCollection('projects')
    const project = await projectCollection.findOne(
      {
        _id: new ObjectId(data.projectId),
        members: { $in: [new ObjectId(data.memberId)] }
      }, {
        projection: { _id: 1 }
      }
    )

    return project !== null
  }
}
