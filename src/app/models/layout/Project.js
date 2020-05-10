import Sequelize, { Model } from 'sequelize'

class Project extends Model {
  static init (sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        subtitle: Sequelize.STRING,
        description: Sequelize.TEXT,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate = models => {
    this.belongsTo(models.File, { foreignKey: 'primary', as: 'primary_image' });
    this.belongsTo(models.File, { foreignKey: 'secondary', as: 'secondary_image' });
    this.belongsTo(models.File, { foreignKey: 'tertiary', as: 'tertiary_image' });
    this.belongsTo(models.File, { foreignKey: 'fourthly', as: 'fourthly_image' });
  }
}

export default Project