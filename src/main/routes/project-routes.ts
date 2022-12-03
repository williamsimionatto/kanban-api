import { Router } from 'express'

import { adaptRoute } from '../adapters'
import { makeAddProjectController } from '../factories/controllers/project'
import { makeAddProjectMembersController } from '../factories/controllers/project-member'
import { auth } from '../middlewares'

export default (router: Router): void => {
  router.post('/project', auth, adaptRoute(makeAddProjectController()))
  router.post('/project/:projectId/member', auth, adaptRoute(makeAddProjectMembersController()))
}
