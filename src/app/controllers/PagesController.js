const { Page, User } = require('../models')
const Mercury = require('@postlight/mercury-parser')

class PagesController {
  /**
   * All user pages
   */
  async index(req, res) {
    const pages = await Page.findAll({
      attributes: ['id', 'title'],
      include: [
        {
          model: User,
          as: 'users',
          through: {
            attributes: [],
            where: { user_id: req.userId },
          },
        },
      ],
    })

    return res.json(pages)
  }

  /**
   * Show page
   */
  async show(req, res) {
    const { id } = req.params

    const web = await Page.findOne({ where: { id } })

    if (!web) {
      return res.status(400).json({ message: '', error: 'Page not found' })
    }

    return res.json(web)
  }

  /**
   * Save new page
   */
  async store(req, res) {
    const { url } = req.body

    const parser = await Mercury.parse(url)

    if (await Page.findOne({ where: { url: parser.url } })) {
      return res.status(400).json({ message: '', error: 'Page already exist' })
    }

    const page = await Page.create(parser)

    page.setUsers(req.userId)

    return res.status(200).json({ message: "Page saved'", error: '' })
  }
}

module.exports = new PagesController()
