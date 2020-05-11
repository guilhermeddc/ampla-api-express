import * as Yup from 'yup'

import Project from '../../models/layout/Project'
import File from '../../models/File'


class ProjectController {
  async index (req, res) {
    try {
      const projects = await Project.findAll({
        include: [
          { model: File, as: 'primary_image', attributes: ['name', 'path', 'url'] },
          { model: File, as: 'secondary_image', attributes: ['name', 'path', 'url'] },
          { model: File, as: 'tertiary_image', attributes: ['name', 'path', 'url'] },
          { model: File, as: 'fourthly_image', attributes: ['name', 'path', 'url'] },
        ]
      })

      return res.json(projects)
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async show (req, res) {
    try {
      const { id } = req.params

      const project = await Project.findByPk(id, {
        include: [
          { model: File, as: 'primary_image', attributes: ['name', 'path', 'url'] },
          { model: File, as: 'secondary_image', attributes: ['name', 'path', 'url'] },
          { model: File, as: 'tertiary_image', attributes: ['name', 'path', 'url'] },
          { model: File, as: 'fourthly_image', attributes: ['name', 'path', 'url'] },
        ]
      })

      if (!project) {
        return res.status(400).json({ error: 'Project not found' })
      }

      return res.json(project)
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async store (req, res) {
    try {
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
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async update (req, res) {
    try {
      const schema = Yup.object().shape({
        title: Yup.string(),
        subtitle: Yup.string(),
        description: Yup.string(),
        primary: Yup.number(),
        secondary: Yup.number(),
        tertiary: Yup.number(),
        fourthly: Yup.number(),
      })

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' })
      }

      const { id } = req.params

      const project = await Project.findByPk(id)

      if (!project) {
        return res.status(400).json({ error: 'Project not found' })
      }

      const {
        title, subtitle, description, primary, secondary, tertiary, fourthly
      } = await project.update(req.body)

      return res.json({
        title, subtitle, description, primary, secondary, tertiary, fourthly
      })
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async destroy (req, res) {
    try {
      const { id } = req.params

      const project = await Project.findByPk(id)

      if (!project) {
        return res.status(400).json({ error: 'Project not found' })
      }

      await project.destroy()

      return res.json({ message: 'Item deleted' })
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }
}

export default new ProjectController()