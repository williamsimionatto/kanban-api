import { Router } from 'express'

import { adaptRoute } from '../adapters'
import { makeAddOrganizationController } from '../factories/controllers/organization'
import { makeLoadProjectsByOrganizationController } from '../factories/controllers/project'
import { adminAuth } from '../middlewares'

export default (router: Router): void => {
  router.post('/organization', adminAuth, adaptRoute(makeAddOrganizationController()))
  router.get('/organization/:organizationId/projects', adminAuth, adaptRoute(makeLoadProjectsByOrganizationController()))
}
