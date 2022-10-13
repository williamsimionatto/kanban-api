import express from 'express'

const app = express()
app.listen(9090, () => {
  console.log('Server running at http://localhost:9090')
})
