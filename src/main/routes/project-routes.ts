import { Router } from 'express'

import { makeAddProjectController, makeLoadProjectByIdController } from '../factories/controllers/project'
import { makeAddProjectMembersController } from '../factories/controllers/project-member'

import { adaptRoute } from '../adapters'
import { auth } from '../middlewares'

export default (router: Router): void => {
  router.get('/project/:projectId', auth, adaptRoute(makeLoadProjectByIdController()))

  router.post('/project', auth, adaptRoute(makeAddProjectController()))
  router.post('/project/:projectId/member', auth, adaptRoute(makeAddProjectMembersController()))
}
