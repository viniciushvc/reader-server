const { Feed } = require('../models')
const RssParser = require('rss-parser')

const rssParser = new RssParser()

class FeedController {
  /**
   * All feed user
   */
  async index(req, res) {
    const urls = await Feed.findAll({
      where: { user_id: req.userId },
      attributes: ['url'],
      raw: true,
    })

    try {
      const result = []

      for (const { url } of urls) {
        const feed = await rssParser.parseURL(url)

        if (feed.items.length > 0) {
          for (const item of feed.items) {
            const obj = {
              title: item.title,
              link: item.link,
              date: item.pubDate,
              content: item['content:encoded'] || item.content,
            }

            result.push(obj)
          }
        }
      }

      return res.status(200).json(result)
    } catch (e) {
      next(e)
    }
  }

  /**
   * Save new feed
   */
  async store(req, res) {
    const { url } = req.body

    if (await Feed.findOne({ where: { url, user_id: req.userId } })) {
      return res.status(200).json({ message: 'Feed already exists', error: '' })
    } else {
      await Feed.create({ url, user_id: req.userId })

      return res.status(200).json({ message: 'Feed saved', error: '' })
    }
  }

  /**
   * Delete feed
   */
  async delete(req, res) {
    const user_id = req.userId
    const { url } = req.body

    const feed = await Feed.findOne({ where: { user_id, url } })

    if (!feed) {
      return res.status(400).json({ message: '', error: 'Feed not found' })
    }

    await feed.destroy()

    return res.status(200).json({ message: 'Feed deleted', error: '' })
  }
}

module.exports = new FeedController()
