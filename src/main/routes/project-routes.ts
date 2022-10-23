import { Router } from 'express'

import { adaptRoute } from '../adapters'
import { makeAddProjectController } from '../factories/controllers/project'
import { adminAuth } from '../middlewares'

export default (router: Router): void => {
  router.post('/project', adminAuth, adaptRoute(makeAddProjectController()))
}
