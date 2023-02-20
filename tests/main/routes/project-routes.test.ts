import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../../src/infra/db/mongodb/'
import app from '../../../src/main/config/app'
import env from '../../../src/main/config/env'
import faker from 'faker'

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

describe('Project Routes', () => {
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

  describe('POST /project', () => {
    let organization: any

    beforeEach(async () => {
      const organizationData = {
        name: 'organization name',
        description: 'organization description'
      }

      organization = await organizationCollection.insertOne(organizationData)
    })

    test('Should return 403 on add project without accesstoken', async () => {
      await request(app)
        .post('/api/project')
        .send({
          name: 'any_name',
          description: 'any_description',
          status: 'active',
          startDate: '2021-01-01',
          endDate: '2021-01-01',
          organizationId: organization.insertedId.toHexString()
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
          endDate: '2021-12-31',
          organizationId: organization.insertedId.toHexString()
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
          endDate: null,
          organizationId: organization.insertedId.toHexString()
        })
        .expect(204)
    })
  })

  describe('POST /project/:projectId/member', () => {
    let project: any
    let account: any
    let organization: any

    beforeAll(async () => {
      const organizationData = {
        name: 'organization name',
        description: 'organization description'
      }

      organization = await organizationCollection.insertOne(organizationData)

      project = await projectCollection.insertOne({
        name: 'any_name',
        description: 'any_description',
        status: 'active',
        startDate: '2021-01-01',
        endDate: '2021-12-31',
        organizationId: organization.insertedId.toHexString()
      })

      account = await accountCollection.insertOne({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      })
    })

    test('Should return 403 on add project member without accesstoken', async () => {
      const projectId = project.insertedId.toHexString()

      await request(app)
        .post(`/api/project/${projectId}/member`)
        .send({
          accountId: account.insertedId.toHexString()
        })
        .expect(403)
    })

    test('Should return 201 on add project member with valid accessToken', async () => {
      const res = await projectCollection.insertOne({
        name: 'any_name',
        description: 'any_description',
        status: 'active',
        startDate: '2021-01-01',
        endDate: '2021-12-31',
        organizationId: organization.insertedId.toHexString()
      })

      const accessToken = await mockAccessToken()

      await request(app)
        .post(`/api/project/${res.insertedId.toHexString()}/member`)
        .set('x-access-token', accessToken)
        .send({
          accountId: account.insertedId.toHexString()
        })
        .expect(201)
    })
  })

  describe('POST /project/:projectId/phases', () => {
    let project: any
    let organization: any

    beforeAll(async () => {
      const organizationData = {
        name: 'organization name',
        description: 'organization description'
      }

      organization = await organizationCollection.insertOne(organizationData)

      project = await projectCollection.insertOne({
        name: 'any_name',
        description: 'any_description',
        status: 'active',
        startDate: '2021-01-01',
        endDate: '2021-12-31',
        organizationId: organization.insertedId.toHexString()
      })
    })

    test('Should return 403 on add project phase without accesstoken', async () => {
      const projectId = project.insertedId.toHexString()

      await request(app)
        .post(`/api/project/${projectId}/phases`)
        .send({
          name: 'any_name',
          description: 'any_description',
          order: 1,
          type: 'BACKLOG'
        })
        .expect(403)
    })

    test('Should return 201 on add project phase with valid accessToken', async () => {
      const accessToken = await mockAccessToken()
      const res = await projectCollection.insertOne({
        name: 'any_name',
        description: 'any_description',
        status: 'active',
        startDate: '2021-01-01',
        endDate: '2021-12-31',
        organizationId: organization.insertedId.toHexString()
      })
      const projectId = res.insertedId.toHexString()

      await request(app)
        .post(`/api/project/${projectId}/phases`)
        .set('x-access-token', accessToken)
        .send({
          name: 'any_name',
          description: 'any_description',
          order: 1,
          type: 'BACKLOG'
        })
        .expect(201)
    })
  })

  describe('PUT /project/:id', () => {
    let project: any
    let organization: any

    beforeEach(async () => {
      const organizationData = {
        name: 'organization name',
        description: 'organization description'
      }

      organization = await organizationCollection.insertOne(organizationData)

      project = await projectCollection.insertOne({
        name: 'any_name',
        description: 'any_description',
        status: 'active',
        startDate: '2021-01-01',
        endDate: '2021-12-31',
        organizationId: organization.insertedId.toHexString()
      })
    })

    test('Should return 403 on edit project without accesstoken', async () => {
      await request(app)
        .put(`/api/project/${project.insertedId.toHexString()}`)
        .send({
          name: 'any_name',
          description: 'any_description',
          status: 'active',
          startDate: '2021-01-01',
          endDate: '2021-01-01',
          organizationId: organization.insertedId.toHexString()
        })
        .expect(403)
    })

    test('Should return 204 on edit survey with valid accessToken', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .put(`/api/project/${project.insertedId.toHexString()}`)
        .set('x-access-token', accessToken)
        .send({
          name: 'any_name',
          description: 'any_description',
          status: 'active',
          startDate: '2021-01-01',
          endDate: '2021-12-31',
          organizationId: organization.insertedId.toHexString()
        })
        .expect(204)
    })

    test('Should 204 on edit project with null end date', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .put(`/api/project/${project.insertedId.toHexString()}`)
        .set('x-access-token', accessToken)
        .send({
          name: 'any_name',
          description: 'any_description',
          status: 'active',
          startDate: '2021-01-01',
          endDate: null,
          organizationId: organization.insertedId.toHexString()
        })
        .expect(204)
    })
  })
})
