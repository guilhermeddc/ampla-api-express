import * as Yup from 'yup'

import Project from '../../models/layout/Project'
import File from '../../models/File'


class ProjectController {
  async index (req, res) {
    const projects = await Project.findAll({
      include: [
        { model: File, as: 'primary_image', attributes: ['name', 'path', 'url'] },
        { model: File, as: 'secondary_image', attributes: ['name', 'path', 'url'] },
        { model: File, as: 'tertiary_image', attributes: ['name', 'path', 'url'] },
        { model: File, as: 'fourthly_image', attributes: ['name', 'path', 'url'] },
      ]
    })

    return res.json(projects)
  }

  async show (req, res) {
    const { id } = req.params

    const project = await Project.findByPk(id, {
      include: [
        { model: File, as: 'primary_image', attributes: ['name', 'path', 'url'] },
        { model: File, as: 'secondary_image', attributes: ['name', 'path', 'url'] },
        { model: File, as: 'tertiary_image', attributes: ['name', 'path', 'url'] },
        { model: File, as: 'fourthly_image', attributes: ['name', 'path', 'url'] },
      ]
    })

    return res.json(project)
  }

  async store (req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      subtitle: Yup.string().required(),
      description: Yup.string().required(),
      primary: Yup.number().required(),
      secondary: Yup.number().required(),
      tertiary: Yup.number().required(),
      fourthly: Yup.number().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const {
      id, title, subtitle, description, primary, secondary, tertiary, fourthly
    } = await Project.create(req.body)

    return res.json({
      id, title, subtitle, description, primary, secondary, tertiary, fourthly
    })
  }
}

export default new ProjectController()