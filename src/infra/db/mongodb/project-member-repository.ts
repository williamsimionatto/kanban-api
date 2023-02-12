import { ObjectId } from 'mongodb'

import {
  ActivateProjectMemberRepository,
  AddProjectMemberRepository,
  CheckProjectMemberRepository,
  InactivateProjectMemberRepository
} from '../../../data/protocols/db/project'
import { ActivateProjectMember } from '../../../domain/usecases'

import { MongoHelper } from './mongo-helper'

export class ProjectMemberMongoRepository implements
  AddProjectMemberRepository,
  CheckProjectMemberRepository,
  ActivateProjectMemberRepository,
  InactivateProjectMemberRepository {
  async addMember (data: AddProjectMemberRepository.Params): Promise<void> {
    const organizationCollection = await MongoHelper.getCollection('projects')

    await organizationCollection.updateOne({
      _id: new ObjectId(data.projectId)
    }, {
      $addToSet: {
        members: {
          id: new ObjectId(data.accountId),
          active: true
        }
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

  async activate (params: ActivateProjectMember.Params): Promise<void> {
    const projectCollection = await MongoHelper.getCollection('projects')
    await projectCollection.updateOne({
      _id: new ObjectId(params.projectId),
      'members.id': new ObjectId(params.accountId)
    }, {
      $set: {
        'members.$.active': true
      }
    })
  }

  async inactivate (params: ActivateProjectMember.Params): Promise<void> {
    const projectCollection = await MongoHelper.getCollection('projects')
    await projectCollection.updateOne({
      _id: new ObjectId(params.projectId),
      'members.id': new ObjectId(params.accountId)
    }, {
      $set: {
        'members.$.active': false
      }
    })
  }
}
