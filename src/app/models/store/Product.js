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
    this.belongsTo(models.File, { foreignKey: 'image_id', as: 'image' });
    this.hasMany(models.ProductImage, { foreignKey: 'product_id', as: 'images' });
  }
}

export default Product