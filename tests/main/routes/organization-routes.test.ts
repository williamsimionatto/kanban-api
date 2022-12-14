import { sign } from 'jsonwebtoken'
import { Collection, ObjectId } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../../src/infra/db/mongodb/'
import app from '../../../src/main/config/app'
import env from '../../../src/main/config/env'
import faker from 'faker'
import FakeObjectId from 'bson-objectid'

let organizationCollection: Collection
let accountCollection: Collection
let projectCollection: Collection

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

    projectCollection = await MongoHelper.getCollection('projects')
    await projectCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /organization', () => {
    test('Should return 403 on add organization without accesstoken', async () => {
      await request(app)
        .post('/api/organization')
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

  describe('/organization/:organizationId/projects', () => {
    test('Should return 403 on load projects without accessToken', async () => {
      await request(app)
        .get('/api/organization/any_organization_id/projects')
        .expect(403)
    })

    test('Should return 204 on load projects with valid accessToken and no exists projects for organization', async () => {
      const organizationId = new FakeObjectId().toHexString()
      const accessToken = await mockAccessToken()
      await request(app)
        .get(`/api/organization/${organizationId}/projects`)
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('Should return 200 on load projects with valid accessToken and exists projects for organization', async () => {
      const accessToken = await mockAccessToken()
      const organization = await organizationCollection.insertOne({
        name: faker.company.companyName(),
        description: faker.lorem.paragraph()
      })

      await projectCollection.insertOne({
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        status: 'active',
        startDate: new Date(),
        organizationId: new ObjectId(organization.insertedId.toHexString())
      })

      await request(app)
        .get(`/api/organization/${organization.insertedId.toHexString()}/projects`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
