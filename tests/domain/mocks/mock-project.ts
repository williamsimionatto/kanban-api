import faker from 'faker'
import FakeObjectId from 'bson-objectid'

import { AddProject, LoadProjectsByOrganization } from '../../../src/domain/usecases'
import { ProjectModel } from '../../../src/domain/model'

export const mockProjectModel = (): LoadProjectsByOrganization.Result => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  description: faker.random.words(),
  startDate: faker.date.past(),
  endDate: faker.date.future(),
  organizationId: new FakeObjectId().toHexString()
})

export const mockOrganizationProjectsModel = (): LoadProjectsByOrganization.Result[] => ([
  mockProjectModel(),
  mockProjectModel()
])

const project = mockProjectModel()

export const mockProjectModelWithMembers = (): ProjectModel => (
  Object.assign(project, {
    members: [{
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      organizationId: project.organizationId,
      active: true
    }]
  })
)

export const makeProjectParams = (): AddProject.Params => ({
  name: faker.name.firstName(),
  description: faker.random.words(),
  status: faker.random.arrayElement(['active', 'inactive']),
  startDate: faker.date.recent(),
  endDate: faker.date.future(),
  organizationId: new FakeObjectId().toHexString()
})
