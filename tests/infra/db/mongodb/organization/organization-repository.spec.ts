import { Collection } from 'mongodb'
import faker from 'faker'
import MockDate from 'mockdate'

import { AddAccount, AddOrganization } from '../../../../../src/domain/usecases'

import { MongoHelper } from '../../../../../src/infra/db/mongodb/helpers'
import { OrganizationMongoRepository } from '../../../../../src/infra/db/mongodb'

let organizations: Collection
let accounts: Collection

const makeOrganizationParams = (): AddOrganization.Params => ({
  name: faker.company.companyName(),
  description: faker.random.words()
})

const makeAccountParams = (): AddAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  organizationId: faker.datatype.uuid()
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

  describe('addMember()', () => {
    test('Should add a member on addMember success', async () => {
      const sut = makeSut()
      const organizationParams = makeOrganizationParams()
      await sut.add(organizationParams)
      const organization = await organizations.findOne({ name: organizationParams.name })

      const account = makeAccountParams()
      account.organizationId = organization._id.toHexString()
      await accounts.insertOne(account)
      const member = await accounts.findOne({ email: account.email })

      await sut.addMember({ organizationId: organization._id.toHexString(), accountId: member._id.toHexString() })
      const organizationWithMember = await organizations.findOne({ name: organizationParams.name })

      expect(organizationWithMember.members.length).toBe(1)
      expect(organizationWithMember.members).toEqual([member._id])
    })
  })
})
