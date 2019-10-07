module.exports = (sequelize, DataTypes) => {
  const WebParser = sequelize.define('WebParser', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    content: DataTypes.STRING,
    lead_image_url: DataTypes.STRING,
    date_published: DataTypes.STRING,
    url: DataTypes.STRING,
    domain: DataTypes.STRING,
  })

  return WebParser
}
