import faker from 'faker'
import FakeObjectId from 'bson-objectid'

import { LoadProjectsByOrganization } from '../../../src/domain/usecases/load-projects-by-organization'

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
