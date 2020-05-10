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
    this.hasMany(models.ProjectImage, { foreignKey: 'project_id', as: 'images' });
  }
}

export default Project