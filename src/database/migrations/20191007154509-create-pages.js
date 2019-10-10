'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pages', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(1000),
      },
      author: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING(20000),
      },
      lead_image_url: {
        type: Sequelize.STRING(1000),
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
    return queryInterface.dropTable('pages')
  },
}
