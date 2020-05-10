import Sequelize, { Model } from 'sequelize'

class Product extends Model {
  static init (sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        price: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate = models => {
    this.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
    this.belongsTo(models.Provider, { foreignKey: 'provider_id', as: 'provider' });
    this.belongsTo(models.File, { foreignKey: 'primary', as: 'primary_image' });
    this.belongsTo(models.File, { foreignKey: 'secondary', as: 'secondary_image' });
    this.belongsTo(models.File, { foreignKey: 'tertiary', as: 'tertiary_image' });
    this.belongsTo(models.File, { foreignKey: 'fourthly', as: 'fourthly_image' });
  }
}

export default Product