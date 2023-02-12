import { Collection } from 'mongodb'
import faker from 'faker'
import request from 'supertest'
import { sign } from 'jsonwebtoken'

import { MongoHelper } from '../../../src/infra/db/mongodb'

import env from '../../../src/main/config/env'
import app from '../../../src/main/config/app'

let projectCollection: Collection
let accountCollection: Collection
let organizationCollection: Collection

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

describe('ProjectMember Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    projectCollection = await MongoHelper.getCollection('projects')
    await projectCollection.deleteMany({})

    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})

    organizationCollection = await MongoHelper.getCollection('organizations')
    await organizationCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('PUT /project/:projectId/member/:accountId/activate', () => {
    let project: any
    let account: any
    let organization: any

    beforeEach(async () => {
      const organizationData = {
        name: 'organization name',
        description: 'organization description'
      }

      organization = await organizationCollection.insertOne(organizationData)

      account = await accountCollection.insertOne({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      })

      project = await projectCollection.insertOne({
        name: 'any_name',
        description: 'any_description',
        status: 'active',
        startDate: '2021-01-01',
        endDate: '2021-12-31',
        organizationId: organization.insertedId.toHexString(),
        members: [
          {
            id: account.insertedId.toHexString(),
            active: false
          }
        ]
      })
    })

    test('Should return 403 on add project member without accesstoken', async () => {
      const projectId = project.insertedId.toHexString()
      const accountId = account.insertedId.toHexString()

      await request(app)
        .put(`/api/project/${projectId}/member/${accountId}/activate`)
        .send({
          active: true
        })
        .expect(403)
    })

    test('Should return 200 on activate project member with valid accessToken', async () => {
      const projectId = project.insertedId.toHexString()
      const accountId = account.insertedId.toHexString()
      const accessToken = await mockAccessToken()

      await request(app)
        .put(`/api/project/${projectId}/member/${accountId}/activate`)
        .set('x-access-token', accessToken)
        .send({
          active: true
        })
        .expect(200)
    })
  })
})
