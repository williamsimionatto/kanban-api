import { Router } from 'express'

import { adaptRoute } from '../adapters'
import { makeAddProjectController } from '../factories/controllers/project'
import { makeAddProjectMembersController } from '../factories/controllers/project-member'
import { adminAuth } from '../middlewares'

export default (router: Router): void => {
  router.post('/project', adminAuth, adaptRoute(makeAddProjectController()))
  router.post('/project/:projectId/member', adminAuth, adaptRoute(makeAddProjectMembersController()))
}
