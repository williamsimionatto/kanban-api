import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../../src/infra/db/mongodb/helpers'
import app from '../../../src/main/config/app'
import env from '../../../src/main/config/env'

let projectCollection: Collection
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

describe('Project Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    projectCollection = await MongoHelper.getCollection('projects')
    await projectCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /project', () => {
    test('Should return 403 on add project without accesstoken', async () => {
      await request(app)
        .post('/api/project')
        .send({
          name: 'any_name',
          description: 'any_description',
          status: 'active',
          startDate: '2021-01-01',
          endDate: '2021-01-01'
        })
        .expect(403)
    })

    test('Should return 204 on add survey with valid accessToken', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .post('/api/project')
        .set('x-access-token', accessToken)
        .send({
          name: 'any_name',
          description: 'any_description',
          status: 'active',
          startDate: '2021-01-01',
          endDate: '2021-12-31'
        })
        .expect(204)
    })

    test('Should 204 on add project with null end date', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .post('/api/project')
        .set('x-access-token', accessToken)
        .send({
          name: 'any_name',
          description: 'any_description',
          status: 'active',
          startDate: '2021-01-01',
          endDate: null
        })
        .expect(204)
    })
  })
})
