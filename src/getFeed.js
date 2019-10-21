const Parser = require('rss-parser')
const parser = new Parser()

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'

function getFeed(urlFeed) {
  parser.parseURL(CORS_PROXY + urlFeed, function(err, feed) {
    if (err) throw err
    console.log(feed.title)
    feed.items.forEach(function(entry) {
      console.log(entry.title + ':' + entry.link)
    })
  })
}

module.exports = getFeed
