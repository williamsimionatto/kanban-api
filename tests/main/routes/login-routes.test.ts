import request from 'supertest'
import { MongoHelper } from '../../../src/infra/db/mongodb/helpers'
import app from '../../../src/main/config/app'

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'William',
          email: 'william@mail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(201)
    })
  })
})
