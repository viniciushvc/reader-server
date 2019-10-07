const routes = require('express').Router()

const authMiddleware = require('./app/middleware/auth')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const WebParserController = require('./app/controllers/WebParserController')

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

// authorization
routes.use(authMiddleware)

routes.get('/users', UserController.show)
routes.put('/users', UserController.update)
routes.delete('/users', UserController.delete)

routes.get('/webparser', WebParserController.index)
routes.post('/webparser', WebParserController.store)

routes.get('/dashboard', (req, res) => {
  return res.status(200).send('ok')
})

module.exports = routes
