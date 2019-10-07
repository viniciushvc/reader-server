'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('web_parsers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING,
      },
      lead_image_url: {
        type: Sequelize.STRING,
      },
      date_published: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.STRING,
        unique: true,
      },
      domain: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('web_parsers')
  },
}
