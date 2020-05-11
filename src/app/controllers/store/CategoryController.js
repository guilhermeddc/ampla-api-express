import * as Yup from 'yup'

import Category from '../../models/store/Category'
import File from '../../models/File'

class CategoryController {
  async index (req, res) {
    try {
      const categories = await Category.findAll({
        attributes: ['id', 'name', 'description', 'image_id'],
        include: [
          { model: File, as: 'image', attributes: ['name', 'path', 'url'] }
        ]
      })

      return res.json(categories)
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async show (req, res) {
    try {
      const { id } = req.params

      const category = await Category.findByPk(id, {
        attributes: ['id', 'name', 'description', 'image_id'],
        include: [
          { model: File, as: 'image', attributes: ['name', 'path', 'url'] }
        ]
      })

      if (!category) {
        return res.status(400).json({ error: 'Category not found' })
      }

      return res.json(category)
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async store (req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string().required(),
        image_id: Yup.number()
      })

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' })
      }

      const categoryExists = await Category.findOne({ where: { name: req.body.name } })

      if (categoryExists) {
        return res.status(400).json({ error: 'Category already exists' })
      }

      const { id, name, description, image_id } = await Category.create(req.body)

      return res.json({ id, name, description, image_id })
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async update (req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        description: Yup.string(),
        image_id: Yup.number()
      })

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' })
      }

      const { id } = req.params

      const category = await Category.findByPk(id)

      if (!category) {
        return res.status(400).json({ error: 'Category not found' })
      }

      const { name, description, image_id } = await category.update(req.body)

      return res.json({ name, description, image_id })
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async destroy (req, res) {
    try {
      const { id } = req.params

      const category = await Category.findByPk(id)

      if (!category) {
        return res.status(400).json({ error: 'Category not found' })
      }

      await category.destroy()

      return res.json({ message: 'Item deleted' })
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }
}

export default new CategoryController()