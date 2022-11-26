import { Router } from 'express'

import { adaptRoute } from '../adapters'
import { makeAddOrganizationController } from '../factories/controllers/organization'
import { makeAddOrganizationMembersController } from '../factories/controllers/organization-member'
import { adminAuth } from '../middlewares'

export default (router: Router): void => {
  router.post('/organization', adminAuth, adaptRoute(makeAddOrganizationController()))
  router.post('/organization/:organizationId/member', adminAuth, adaptRoute(makeAddOrganizationMembersController()))
}
