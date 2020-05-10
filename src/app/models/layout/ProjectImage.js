import Sequelize, { Model } from 'sequelize'

class ProjectImage extends Model {
  static init (sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get () {
            return `${process.env.APP_URL}/projects_images/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate = models => {
    this.belongsTo(models.Project, { foreignKey: 'project_id', as: 'project'})
  }
}

export default ProjectImage