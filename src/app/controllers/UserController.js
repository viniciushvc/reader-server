const { User } = require('../models')

class UserController {
  async index(req, res) {
    const user = await User.findAll({ attributes: ['id', 'email'] })

    return res.json(user)
  }

  async store(req, res) {
    const { email } = req.body

    if (await User.findOne({ where: { email } })) {
      return res.status(400).json({ error: 'User already exist' })
    }

    const user = await User.create(req.body)

    return res.status(200).json(user)
  }

  async store(req, res) {
    const { email } = req.body

    if (await User.findOne({ where: { email } })) {
      return res.status(400).json({ message: '', error: 'User already exist' })
    }

    await User.create(req.body)

    return res.status(200).json({ message: 'User created', error: '' })
  }

  async update(req, res) {
    const { id } = req.params

    await User.update(req.body, { where: { id } })

    return res.status(200).json({ message: 'User updated', error: '' })
  }

  async delete(req, res) {
    const { id } = req.params

    const user = await User.findOne(req.body, { where: { id } })

    if (!user) {
      return res.status(400).json({ message: '', error: 'User not found' })
    }

    user.destroy()

    return res.status(200).json({ message: 'User deleted', error: '' })
  }
}

module.exports = new UserController()
