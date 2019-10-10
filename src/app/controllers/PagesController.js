const { Page, User, sequelize } = require('../models')
const Mercury = require('@postlight/mercury-parser')
const removeTags = require('../../utils/removeTags')

class PagesController {
  /**
   * All user pages
   */
  async index(req, res) {
    const pages = await sequelize.query(
      `SELECT p.id, p.title, p.lead_image_url FROM
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

    const parse = await Mercury.parse(url)

    const exists = await Page.findOne({ where: { url: parse.url } })

    if (!exists) {
      const page = await Page.create(removeTags(parse))

      page.setUsers(req.userId)

      return res.status(200).json({ message: "Page saved'", error: '' })
    } else {
      exists.setUsers(req.userId)
    }
  }

  /**
   * Save new page
   */
  async delete(req, res) {
    const { id } = req.body

    console.log(req)

    await sequelize.query(
      `DELETE FROM 
          users_pages
        WHERE 
          page_id = ${id} AND 
          user_id = ${req.userId}`
    )

    return res.status(200).json({ message: "Page removed'", error: '' })
  }
}

module.exports = new PagesController()
