const { User } = require('../models')

class UserController {
  /**
   * Show user infos
   */
  async show(req, res) {
    const id = req.userId

    const user = await User.findOne({
      where: { id },
      attributes: ['name', 'password_hash'],
    })

    return res.json(user)
  }
  /**
   * New user
   */
  async store(req, res) {
    const { email } = req.body

    if (await User.findOne({ where: { email } })) {
      return res.status(400).json({ message: '', error: 'User already exist' })
    }

    const user = await User.create(req.body)

    return res
      .status(200)
      .json({
        result: { token: user.generateToken() },
        message: 'User created',
        error: '',
      })
  }

  /**
   * Update user
   */
  async update(req, res) {
    const id = req.userId

    await User.update(req.body, { where: { id } })

    return res.status(200).json({ message: 'User updated', error: '' })
  }

  /**
   * Delete user
   */
  async delete(req, res) {
    const id = req.userId

    const user = await User.findOne(req.body, { where: { id } })

    if (!user) {
      return res.status(400).json({ message: '', error: 'User not found' })
    }

    await user.destroy()

    return res.status(200).json({ message: 'User deleted', error: '' })
  }
}

module.exports = new UserController()
