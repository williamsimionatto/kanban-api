import { Collection } from 'mongodb'
import { MongoHelper } from '../../../../../src/infra/db/mongodb/helpers'

import faker from 'faker'
import MockDate from 'mockdate'

import { ProjectMongoRepository } from '../../../../../src/infra/db/mongodb'
import { AddProject } from '../../../../../src/domain/usecases'
import env from '../../../../../src/main/config/env'

let projects: Collection

const makeProjectParams = (): AddProject.Params => ({
  name: faker.name.firstName(),
  description: faker.random.words(),
  status: faker.random.arrayElement(['active', 'inactive']),
  startDate: faker.date.recent(),
  endDate: faker.date.future()
})

const makeSut = (): ProjectMongoRepository => {
  return new ProjectMongoRepository()
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    MockDate.reset()
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    projects = await MongoHelper.getCollection('projects')
    await projects.deleteMany({})
  })

  describe('add()', () => {
    test('Should create an project on add success', async () => {
      const sut = makeSut()
      const projectParams = makeProjectParams()
      await sut.add(projectParams)
      const project = await projects.findOne({ name: projectParams.name })
      expect(project).toBeTruthy()
    })
  })
})
