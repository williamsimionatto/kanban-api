import { Collection } from 'mongodb'
import faker from 'faker'
import MockDate from 'mockdate'

import { AddOrganization } from '../../../../src/domain/usecases'

import { MongoHelper, OrganizationMongoRepository } from '../../../../src/infra/db/mongodb'

let organizations: Collection
let accounts: Collection

const makeOrganizationParams = (): AddOrganization.Params => ({
  name: faker.company.companyName(),
  description: faker.random.words()
})

const makeSut = (): OrganizationMongoRepository => {
  return new OrganizationMongoRepository()
}

describe('Organization Mongo Repository', () => {
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
    accounts = await MongoHelper.getCollection('accounts')
    await accounts.deleteMany({})
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
})
