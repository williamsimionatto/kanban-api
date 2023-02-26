import FakeObjectId from 'bson-objectid'
import faker from 'faker'
import MockDate from 'mockdate'
import { Collection, ObjectId } from 'mongodb'

import { AddAccount } from '../../../../src/domain/usecases'
import { MongoHelper, ProjectMemberMongoRepository } from '../../../../src/infra/db/mongodb'
import { makeProjectParams } from '../../../domain/mocks'

let projects: Collection
let accounts: Collection

const makeAccountParams = (): AddAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  organizationId: faker.datatype.uuid()
})

const makeSut = (): ProjectMemberMongoRepository => {
  return new ProjectMemberMongoRepository()
}

describe('ProjectMemberMongoRepository', () => {
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

  describe('addMember()', () => {
    test('Should add a member on addMember success', async () => {
      const sut = makeSut()
      const projectParams = makeProjectParams()
      await projects.insertOne(projectParams)

      const organization = await projects.findOne({ name: projectParams.name })

      const account = makeAccountParams()
      await accounts.insertOne(account)
      const member = await accounts.findOne({ email: account.email })

      await sut.addMember({ projectId: organization._id.toHexString(), accountId: member._id.toHexString(), active: true })
      await sut.addMember({ projectId: organization._id.toHexString(), accountId: member._id.toHexString(), active: true })
      const projectWithMembers = await projects.findOne({ name: projectParams.name })

      expect(projectWithMembers.members.length).toBe(1)
      expect(projectWithMembers.members[0].id).toEqual(member._id)
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

    test('Should return false if member does not exist', async () => {
      const sut = makeSut()
      const projectParams = makeProjectParams()
      const account = await accounts.insertOne(makeAccountParams())
      const project = await projects.insertOne(
        {
          ...projectParams,
          organizationId: new ObjectId(projectParams.organizationId),
          members: [
            new FakeObjectId().toHexString()
          ]
        }
      )

      const exists = await sut.checkMember({
        projectId: project.insertedId.toHexString(),
        memberId: account.insertedId.toHexString()
      })

      expect(exists).toBe(false)
    })
  })

  describe('activate()', () => {
    test('Should activate a member on project with success', async () => {
      const sut = makeSut()
      const projectParams = makeProjectParams()
      const account = await accounts.insertOne(makeAccountParams())
      const project = await projects.insertOne(
        {
          ...projectParams,
          organizationId: new ObjectId(projectParams.organizationId),
          members: [
            {
              id: new ObjectId(account.insertedId.toHexString()),
              active: false
            }
          ]
        }
      )

      await sut.activate(
        {
          projectId: project.insertedId.toHexString(),
          accountId: account.insertedId.toHexString()
        }
      )
      const projectLoaded = await projects.findOne({ name: projectParams.name })
      const member = projectLoaded.members.find((member: any) => member.id.toHexString() === account.insertedId.toHexString())
      expect(member.active).toBe(true)
    })
  })

  describe('inactivate()', () => {
    test('Should inactivate a member on project with success', async () => {
      const sut = makeSut()
      const projectParams = makeProjectParams()
      const account = await accounts.insertOne(makeAccountParams())
      const project = await projects.insertOne(
        {
          ...projectParams,
          organizationId: new ObjectId(projectParams.organizationId),
          members: [
            {
              id: new ObjectId(account.insertedId.toHexString()),
              active: true
            }
          ]
        }
      )

      await sut.inactivate(
        {
          projectId: project.insertedId.toHexString(),
          accountId: account.insertedId.toHexString()
        }
      )
      const projectLoaded = await projects.findOne({ name: projectParams.name })
      const member = projectLoaded.members.find((member: any) => member.id.toHexString() === account.insertedId.toHexString())
      expect(member.active).toBe(false)
    })
  })
})
