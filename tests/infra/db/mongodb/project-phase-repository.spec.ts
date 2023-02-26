import faker from 'faker'
import MockDate from 'mockdate'
import { Collection } from 'mongodb'

import { AddProjectPhase } from '../../../../src/domain/usecases'
import { MongoHelper, ProjectPhaseMongoRepository } from '../../../../src/infra/db/mongodb'
import { makeProjectParams } from '../../../domain/mocks'

let projects: Collection
let projectPhase: Collection

const makePhaseParams = (): AddProjectPhase.Params => ({
  projectId: '',
  name: faker.name.firstName(),
  description: faker.random.words(),
  order: faker.datatype.number(),
  type: faker.random.arrayElement(['BACKLOG' , 'TODO' , 'DOING' , 'BLOCKED' , 'REVIEW' , 'DONE'])
})

const makeSut = (): ProjectPhaseMongoRepository => {
  return new ProjectPhaseMongoRepository()
}

describe('ProjectPhaseMongoRepository', () => {
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

    projectPhase = await MongoHelper.getCollection('project_phases')
    await projectPhase.deleteMany({})
  })

  describe('add()', () => {
    test('Should create an phase for project on add with success', async () => {
      const sut = makeSut()
      const projectParams = makeProjectParams()
      const res = await projects.insertOne(projectParams)
      const phaseParams = makePhaseParams()
      phaseParams.projectId = res.insertedId.toHexString()
      await sut.add(phaseParams)
      const projectPhaseData = await projectPhase.find({ name: phaseParams.name }).toArray()

      expect(projectPhaseData).toBeTruthy()
      expect(projectPhaseData[0].name).toBe(phaseParams.name)
    })
  })

  describe('check()', () => {
    test('Should return true if phase exists', async () => {
      const sut = makeSut()
      const projectParams = makeProjectParams()
      const res = await projects.insertOne(projectParams)
      const phaseParams = makePhaseParams()
      phaseParams.projectId = res.insertedId.toHexString()
      await sut.add(phaseParams)
      const exists = await sut.checkPhase({
        projectId: phaseParams.projectId,
        phaseType: phaseParams.type
      })

      expect(exists).toBe(true)
    })

    test('Should return false if phase not exists', async () => {
      const sut = makeSut()
      const projectParams = makeProjectParams()
      const res = await projects.insertOne(projectParams)
      const exists = await sut.checkPhase({
        projectId: res.insertedId.toHexString(),
        phaseType: 'BACKLOG'
      })

      expect(exists).toBe(false)
    })
  })
})
