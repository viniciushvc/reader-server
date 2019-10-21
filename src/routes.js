const routes = require('express').Router()

const authMiddleware = require('./app/middleware/auth')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const PagesController = require('./app/controllers/PagesController')
const FeedController = require('./app/controllers/FeedController')

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

// authorization
routes.use(authMiddleware)

routes.get('/users', UserController.show)
routes.put('/users', UserController.update)
routes.delete('/users', UserController.delete)

routes.get('/pages', PagesController.index)
routes.get('/pages/:id', PagesController.show)
routes.post('/pages', PagesController.store)
routes.delete('/pages', PagesController.delete)

routes.get('/feed', FeedController.index)

routes.get('/dashboard', (req, res) => {
  return res.status(200).send('ok')
})

module.exports = routes
