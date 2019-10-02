const routes = require('express').Router()

const authMiddleware = require('./app/middleware/auth')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)

routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

routes.get('/dashboard', (req, res) => {
  return res.status(200).send('ok')
})

module.exports = routes
