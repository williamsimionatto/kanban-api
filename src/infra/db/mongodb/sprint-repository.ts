import { ObjectId } from 'mongodb'
import { AddSprintRepository } from '../../../data/protocols/db/sprint'
import { MongoHelper } from './mongo-helper'

export class SprintMongoRepository implements
  AddSprintRepository {
  async add (data: AddSprintRepository.Params): Promise<void> {
    const sprintCollection = await MongoHelper.getCollection('sprints')
    const { projectId, ...sprintData } = data
    await sprintCollection.insertOne({
      ...sprintData,
      projectId: new ObjectId(projectId)
    })
  }
}
