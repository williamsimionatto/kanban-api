import { Collection } from 'mongodb'
import { MongoHelper } from '../../../../../src/infra/db/mongodb/helpers'

import faker from 'faker'
import MockDate from 'mockdate'

import { ProjectMongoRepository } from '../../../../../src/infra/db/mongodb'
import { AddProject, AddAccount } from '../../../../../src/domain/usecases'

let projects: Collection
let organizations: Collection
let accounts: Collection

const makeProjectParams = (): AddProject.Params => ({
  name: faker.name.firstName(),
  description: faker.random.words(),
  status: faker.random.arrayElement(['active', 'inactive']),
  startDate: faker.date.recent(),
  endDate: faker.date.future()
})

const makeAccountParams = (): AddAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  organizationId: faker.datatype.uuid()
})

const makeSut = (): ProjectMongoRepository => {
  return new ProjectMongoRepository()
}

describe('Account Mongo Repository', () => {
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

    organizations = await MongoHelper.getCollection('organizations')
    await organizations.deleteMany({})
    accounts = await MongoHelper.getCollection('accounts')
    await accounts.deleteMany({})
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

  describe('addMember()', () => {
    test('Should add a member on addMember success', async () => {
      const sut = makeSut()
      const projectParams = makeProjectParams()
      await projects.insertOne(projectParams)

      const organization = await projects.findOne({ name: projectParams.name })

      const account = makeAccountParams()
      await accounts.insertOne(account)
      const member = await accounts.findOne({ email: account.email })

      await sut.addMember({ projectId: organization._id.toHexString(), accountId: member._id.toHexString() })
      const projectWithMembers = await projects.findOne({ name: projectParams.name })

      expect(projectWithMembers.members.length).toBe(1)
      expect(projectWithMembers.members).toEqual([member._id])
    })
  })
})
