module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define('Page', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    content: DataTypes.STRING,
    lead_image_url: DataTypes.STRING,
    date_published: DataTypes.STRING,
    url: DataTypes.STRING,
    domain: DataTypes.STRING,
  })

  Page.associate = models => {
    Page.belongsToMany(models.User, {
      through: 'users_pages',
      as: 'users',
      foreignKey: 'page_id',
    })
  }

  return Page
}
