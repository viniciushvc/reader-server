module.exports = (sequelize, DataTypes) => {
  const Feed = sequelize.define('Feed', {
    url: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  })

  return Feed
}
