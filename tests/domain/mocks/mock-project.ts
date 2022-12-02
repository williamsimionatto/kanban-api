import faker from 'faker'

import { LoadProjectsByOrganization } from '../../../src/domain/usecases/load-projects-by-organization'

export const mockProjectModel = (): LoadProjectsByOrganization.Result => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  description: faker.random.words(),
  startDate: faker.date.past(),
  endDate: faker.date.future()
})

export const mockProjectsModel = (): LoadProjectsByOrganization.Result[] => ([
  mockProjectModel(),
  mockProjectModel()
])
