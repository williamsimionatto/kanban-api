export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/kanban',
  port: process.env.PORT || 9090
}
