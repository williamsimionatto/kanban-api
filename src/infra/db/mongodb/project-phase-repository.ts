import { ObjectId } from 'mongodb'
import { AddProjectPhaseRepository, CheckProjectPhaseRepository } from '../../../data/protocols/db/project'
import { MongoHelper } from './mongo-helper'

export class ProjectPhaseMongoRepository implements
  AddProjectPhaseRepository,
  CheckProjectPhaseRepository {
  async add (params: AddProjectPhaseRepository.Params): Promise<void> {
    const projectCollection = await MongoHelper.getCollection('project_phases')
    await projectCollection.insertOne({
      ...params,
      projectId: new ObjectId(params.projectId)
    })
  }

  async checkPhase (params: CheckProjectPhaseRepository.Params): Promise<CheckProjectPhaseRepository.Result> {
    const projectCollection = await MongoHelper.getCollection('project_phases')
    const projectPhase = await projectCollection.findOne({
      projectId: new ObjectId(params.projectId),
      type: params.phaseType
    })

    return projectPhase !== null
  }
}
