import { Router } from 'express'

import { adaptMiddleware, adaptRoute } from '../adapters'
import { makeAddProjectController } from '../factories/controllers/project'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  router.post('/project', adminAuth, adaptRoute(makeAddProjectController()))
}
