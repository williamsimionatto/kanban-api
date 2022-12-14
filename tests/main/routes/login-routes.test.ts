import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../../src/infra/db/mongodb'
import app from '../../../src/main/config/app'

let accountCollection: Collection
let organizationCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
    organizationCollection = await MongoHelper.getCollection('organizations')
    await organizationCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      const organization = await organizationCollection.insertOne({
        name: 'any_name',
        description: 'any_description'
      })

      await request(app)
        .post('/api/signup')
        .send({
          name: 'William',
          email: 'william@mail.com',
          password: '123',
          passwordConfirmation: '123',
          organizationId: organization.insertedId.toHexString()
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'William',
        email: 'william@mail.com',
        password
      })

      await request(app)
        .post('/api/login')
        .send({
          email: 'william@mail.com',
          password: '123'
        })
        .expect(200)
    })

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'william@mail.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
