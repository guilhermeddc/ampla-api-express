import Sequelize, { Model } from 'sequelize'

class Banner extends Model {
  static init (sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        link: Sequelize.BOOLEAN,
        route: Sequelize.INTEGER
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate = models => {
    this.belongsTo(models.File, { foreignKey: 'background_id', as: 'background' });
    this.belongsTo(models.File, { foreignKey: 'logo_id', as: 'logo' });
    this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
    this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
  }
}

export default Banner