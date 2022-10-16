import { AddProjectRepository } from '../../../../data/protocols/db/project'
import { MongoHelper } from '../helpers'

export class ProjectMongoRepository implements AddProjectRepository {
  async add (data: AddProjectRepository.Params): Promise<void> {
    const projectCollection = await MongoHelper.getCollection('projects')
    await projectCollection.insertOne(data)
  }
}
