import { ObjectId } from 'mongodb'
import { AddProjectPhaseRepository } from '../../../data/protocols/db/project'
import { MongoHelper } from './mongo-helper'

export class ProjectPhaseMongoRepository implements AddProjectPhaseRepository {
  async add (params: AddProjectPhaseRepository.Params): Promise<void> {
    const projectCollection = await MongoHelper.getCollection('project_phases')
    await projectCollection.insertOne({
      ...params,
      projectId: new ObjectId(params.projectId)
    })
  }
}
