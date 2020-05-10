import Sequelize, { Model } from 'sequelize'

class Post extends Model {
  static init (sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.TEXT,
        author: Sequelize.STRING,
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

export default Post