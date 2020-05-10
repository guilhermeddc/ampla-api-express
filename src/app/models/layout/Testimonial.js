import Sequelize, { Model } from 'sequelize'

class Testimonial extends Model {
  static init (sequelize) {
    super.init(
      {
        client: Sequelize.STRING,
        architect: Sequelize.STRING,
        description: Sequelize.TEXT,
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

export default Testimonial