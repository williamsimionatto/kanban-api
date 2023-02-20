import { Router } from 'express'

import { adaptRoute } from '../adapters'

import { makeAddProjectController, makeEditProjectController, makeLoadProjectByIdController } from '../factories/controllers/project'
import { makeAddProjectMembersController, makeStatusProjectMemberController } from '../factories/controllers/project-member'
import { makeAddProjectPhaseController } from '../factories/controllers/project-phase'

import { auth } from '../middlewares'

export default (router: Router): void => {
  router.get('/project/:projectId', auth, adaptRoute(makeLoadProjectByIdController()))

  router.post('/project', auth, adaptRoute(makeAddProjectController()))
  router.post('/project/:projectId/member', auth, adaptRoute(makeAddProjectMembersController()))
  router.post('/project/:projectId/phases', auth, adaptRoute(makeAddProjectPhaseController()))

  router.put('/project/:id', auth, adaptRoute(makeEditProjectController()))
  router.put('/project/:projectId/member/:accountId/activate', auth, adaptRoute(makeStatusProjectMemberController()))
}
