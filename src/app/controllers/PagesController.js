const { Page, User, sequelize } = require('../models')
const Mercury = require('@postlight/mercury-parser')

class PagesController {
  /**
   * All user pages
   */
  async index(req, res) {
    const pages = await sequelize.query(
      `SELECT p.* FROM
          users_pages up, 
          pages p, 
          users u 
        WHERE 
          up.page_id = p.id AND 
          up.user_id = u.id AND
          u.id = ${req.userId}`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    )

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
