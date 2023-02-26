import FakeObjectId from 'bson-objectid'
import faker from 'faker'
import MockDate from 'mockdate'
import { Collection, ObjectId } from 'mongodb'
import { AddSprint } from '../../../../src/domain/usecases'
import { MongoHelper, SprintMongoRepository } from '../../../../src/infra/db/mongodb'

import { makeProjectParams } from '../../../domain/mocks'

let projects: Collection
let sprints: Collection

const makeSprintParams = (): AddSprint.Params => ({
  name: faker.name.firstName(),
  objective: faker.random.words(),
  startDate: faker.date.recent(),
  endDate: faker.date.future(),
  projectId: new FakeObjectId().toHexString()
})

const makeSut = (): SprintMongoRepository => {
  return new SprintMongoRepository()
}

describe('SprintMongoRepository', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    MockDate.reset()
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    projects = await MongoHelper.getCollection('projects')
    await projects.deleteMany({})

    sprints = await MongoHelper.getCollection('sprints')
    await sprints.deleteMany({})
  })

  describe('add()', () => {
    test('Should create an sprint for project on add with success', async () => {
      const sut = makeSut()
      const projectParams = makeProjectParams()
      const project = await projects.insertOne(
        {
          ...projectParams,
          organizationId: new ObjectId(projectParams.organizationId)
        }
      )

      const sprintParams = makeSprintParams()
      await sut.add({
        ...sprintParams,
        projectId: project.insertedId.toHexString()
      })

      const sprint = await sprints.findOne({ name: sprintParams.name })
      expect(sprint).toBeTruthy()
    })
  })
})
