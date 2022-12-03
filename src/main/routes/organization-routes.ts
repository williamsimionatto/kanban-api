import { Router } from 'express'

import { adaptRoute } from '../adapters'
import { makeAddOrganizationController } from '../factories/controllers/organization'
import { makeLoadProjectsByOrganizationController } from '../factories/controllers/project'
import { adminAuth, auth } from '../middlewares'

export default (router: Router): void => {
  router.post('/organization', adminAuth, adaptRoute(makeAddOrganizationController()))
  router.get('/organization/:organizationId/projects', auth, adaptRoute(makeLoadProjectsByOrganizationController()))
}
