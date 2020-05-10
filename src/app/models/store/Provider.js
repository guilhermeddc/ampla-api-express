import Sequelize, { Model } from 'sequelize'

class Provider extends Model {
  static init (sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate = models => {
    this.belongsTo(models.File, { foreignKey: 'image_id', as: 'image' });
  }
}

export default Provider