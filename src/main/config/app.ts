import express from 'express'
import setUpMiddlewares from './middlewares'
import setupRoutes from './routes'

const app = express()
setUpMiddlewares(app)
setupRoutes(app)
export default app
