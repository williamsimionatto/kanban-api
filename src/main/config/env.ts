export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/kanban',
  port: process.env.PORT || 9090,
  jwtSecret: process.env.JWT_SECRET || 'tj6709f7-3a9e-4a0f-8d02-91e7ae3617b2'
}
