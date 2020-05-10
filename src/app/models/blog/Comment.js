import Sequelize, { Model } from 'sequelize'

class Comment extends Model {
  static init (sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        commentary: Sequelize.TEXT,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate = models => {
    this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
  }
}

export default Comment