import faker from 'faker'
import MockDate from 'mockdate'
import FakeObjectId from 'bson-objectid'
import { Collection } from 'mongodb'

import { AddOrganization } from '../../../../src/domain/usecases'

import { MongoHelper, OrganizationMongoRepository } from '../../../../src/infra/db/mongodb'

let organizations: Collection

const makeOrganizationParams = (): AddOrganization.Params => ({
  name: faker.company.companyName(),
  description: faker.random.words()
})

const makeSut = (): OrganizationMongoRepository => {
  return new OrganizationMongoRepository()
}

describe('OrganizationMongoRepository', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    MockDate.reset()
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    organizations = await MongoHelper.getCollection('organizations')
    await organizations.deleteMany({})
  })

  describe('add()', () => {
    test('Should create an organization on add success', async () => {
      const sut = makeSut()
      const organizationParams = makeOrganizationParams()
      await sut.add(organizationParams)
      const organization = await organizations.findOne({ name: organizationParams.name })
      expect(organization).toBeTruthy()
    })
  })

  describe('checkById()', () => {
    test('Should return true if organization exists', async () => {
      const sut = makeSut()
      const organizationParams = makeOrganizationParams()
      const res = await organizations.insertOne(organizationParams)
      const organization = await sut.checkById(res.insertedId.toHexString())
      expect(organization).toBe(true)
    })

    test('Should return false if organization does not exist', async () => {
      const sut = makeSut()
      const exists = await sut.checkById(new FakeObjectId().toHexString())
      expect(exists).toBe(false)
    })
  })
})
