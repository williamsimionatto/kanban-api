import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../../src/infra/db/mongodb/'
import app from '../../../src/main/config/app'
import env from '../../../src/main/config/env'
import faker from 'faker'

let organizationCollection: Collection
let accountCollection: Collection

const mockAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'William',
    email: 'william@gmail.com',
    password: '123',
    role: 'admin'
  })
  const id = res.insertedId.toHexString()
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: res.insertedId
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

describe('Organization Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    organizationCollection = await MongoHelper.getCollection('organizations')
    await organizationCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /organization', () => {
    test('Should return 403 on add organization without accesstoken', async () => {
      await request(app)
        .post('/api/organization')
        .send({
          name: faker.company.companyName(),
          description: faker.lorem.paragraph()
        })
        .expect(403)
    })

    test('Should return 204 on add survey with valid accessToken', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .post('/api/organization')
        .set('x-access-token', accessToken)
        .send({
          name: faker.company.companyName(),
          description: faker.lorem.paragraph()
        })
        .expect(204)
    })
  })
})
