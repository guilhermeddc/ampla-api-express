import * as Yup from 'yup'

import Category from '../../models/store/Category'
import File from '../../models/File'

class CategoryController {
  async index (req, res) {
    const categories = await Category.findAll({
      attributes: ['id', 'name', 'description', 'image_id'],
      include: [
        { model: File, as: 'image', attributes: ['name', 'path', 'url'] }
      ]
    })

    return res.json(categories)
  }

  async store (req, res) {
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
  }

  async update (req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      image_id: Yup.number()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { id, name, description, image_id } = await Category.update(req.body)

    return res.json({ id, name, description, image_id })
  }
}

export default new CategoryController()