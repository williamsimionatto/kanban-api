import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../../src/infra/db/mongodb/helpers'
import app from '../../../src/main/config/app'

let projectCollection: Collection

describe('Project Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    projectCollection = await MongoHelper.getCollection('projects')
    await projectCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /project', () => {
    test('Should return 204 on add project success', async () => {
      await request(app)
        .post('/api/project')
        .send({
          name: 'any_name',
          description: 'any_description',
          status: 'active',
          startDate: '2021-01-01',
          endDate: '2021-01-01'
        })
        .expect(204)
    })

    test('Should 204 on add project with null end date', async () => {
      await request(app)
        .post('/api/project')
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
