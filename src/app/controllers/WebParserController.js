const { WebParser } = require('../models')
const Mercury = require('@postlight/mercury-parser')
const jwt = require('jsonwebtoken')

class WebParserController {
  /**
   * All user pages
   */
  async index(req, res) {
    const web = await WebParser.findAll({ attributes: ['id', 'title'] })

    return res.json(web)
  }

  /**
   * Show page
   */
  async show(req, res) {
    const { id } = req.params

    const web = await WebParser.findOne({ where: { id } })

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

    if (await WebParser.findOne({ where: { url: parser.url } })) {
      return res.status(400).json({ message: '', error: 'Page already exist' })
    }

    await WebParser.create(parser)

    return res.status(200).json({ message: "Page saved'", error: '' })
  }
}

module.exports = new WebParserController()
