import FakeObjectId from 'bson-objectid'
import faker from 'faker'
import MockDate from 'mockdate'
import { Collection, ObjectId } from 'mongodb'

import { ProjectMongoRepository, MongoHelper } from '../../../../src/infra/db/mongodb'
import { AddProject, AddAccount } from '../../../../src/domain/usecases'

let projects: Collection
let accounts: Collection

const makeAccountParams = (): AddAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  organizationId: faker.datatype.uuid()
})

const makeProjectParams = (): AddProject.Params => ({
  name: faker.name.firstName(),
  description: faker.random.words(),
  status: faker.random.arrayElement(['active', 'inactive']),
  startDate: faker.date.recent(),
  endDate: faker.date.future(),
  organizationId: new FakeObjectId().toHexString()
})

const makeSut = (): ProjectMongoRepository => {
  return new ProjectMongoRepository()
}

describe('ProjectMongoRepository', () => {
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
      await sut.addMember({ projectId: organization._id.toHexString(), accountId: member._id.toHexString() })
      const projectWithMembers = await projects.findOne({ name: projectParams.name })

      expect(projectWithMembers.members.length).toBe(1)
      expect(projectWithMembers.members).toEqual([member._id])
    })
  })

  describe('checkById()', () => {
    test('Should return true if project exists', async () => {
      const sut = makeSut()
      const res = await projects.insertOne(makeProjectParams())
      const exists = await sut.checkById(res.insertedId.toHexString())
      expect(exists).toBe(true)
    })

    test('Should return false if project does not exist', async () => {
      const sut = makeSut()
      const exists = await sut.checkById(new FakeObjectId().toHexString())
      expect(exists).toBe(false)
    })
  })

  describe('loadProjectsByOrganizationId()', () => {
    test('Should return a projects list on success', async () => {
      const sut = makeSut()
      const projectParams = makeProjectParams()
      await projects.insertOne(
        {
          ...projectParams,
          organizationId: new ObjectId(projectParams.organizationId)
        }
      )

      const projectsList = await sut.loadByOrganization(projectParams.organizationId)
      expect(projectsList.length).toBe(1)
      expect(projectsList[0].name).toBe(projectParams.name)
    })

    test('Should return an empty list if there is no projects', async () => {
      const sut = makeSut()
      const projectsList = await sut.loadByOrganization(new FakeObjectId().toHexString())
      expect(projectsList.length).toBe(0)
    })
  })

  describe('checkMember()', () => {
    test('Should return true if member exists', async () => {
      const sut = makeSut()
      const projectParams = makeProjectParams()
      const account = await accounts.insertOne(makeAccountParams())
      const project = await projects.insertOne(
        {
          ...projectParams,
          organizationId: new ObjectId(projectParams.organizationId),
          members: [
            new ObjectId(account.insertedId.toHexString())
          ]
        }
      )

      const exists = await sut.checkMember({
        projectId: project.insertedId.toHexString(),
        memberId: account.insertedId.toHexString()
      })

      expect(exists).toBe(true)
    })
  })
})
