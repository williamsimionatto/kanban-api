import { Router } from 'express'

import { adaptRoute } from '../adapters'
import { makeAddProjectController } from '../factories/controllers/project'

export default (router: Router): void => {
  router.post('/project', adaptRoute(makeAddProjectController()))
}
