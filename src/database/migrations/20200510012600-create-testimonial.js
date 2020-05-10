'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('testimonials', {
      id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      client: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      architect: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      image_id: {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      created_at: { 
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: { 
        type: Sequelize.DATE,
        allowNull: false
      },
    });
  },

  down: queryInterface => queryInterface.dropTable('testimonials')
}
