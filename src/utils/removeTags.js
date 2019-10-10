/**
 * Remove tags HTML do texto
 */
function removeTags(object) {
  Object.keys(object).forEach(v => {
    try {
      object[v] = object[v].replace(/<[^>]*>?/gm, '')
    } catch (err) {
      // null
    }
  })

  return object
}

module.exports = removeTags
