import * as Yup from 'yup'

import Product from '../../models/store/Product'
import Category from '../../models/store/Category'
import Provider from '../../models/store/Provider'
import File from '../../models/File'

class ProductController {
  async index (req, res) {
    try {
      const products = await Product.findAll({
        attributes: [
          'id', 'name', 'description', 'price', 'primary', 'secondary',
          'tertiary', 'fourthly', 'category_id', 'provider_id'
        ],
        include: [
          { model: File, as: 'primary_image', attributes: ['name', 'path', 'url'] },
          { model: File, as: 'secondary_image', attributes: ['name', 'path', 'url'] },
          { model: File, as: 'tertiary_image', attributes: ['name', 'path', 'url'] },
          { model: File, as: 'fourthly_image', attributes: ['name', 'path', 'url'] },
          {
            model: Category, as: 'category', attributes: ['id', 'name', 'description', 'image_id'],
            include: [
              { model: File, as: 'image', attributes: ['name', 'path', 'url'] }
            ]
          },
          {
            model: Provider, as: 'provider', attributes: ['id', 'name', 'description', 'image_id'],
            include: [
              { model: File, as: 'image', attributes: ['name', 'path', 'url'] }
            ]
          },
        ]
      })

      return res.json(products)
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async show (req, res) {
    try {
      const { id } = req.params

      const product = await Product.findByPk(id, {
        attributes: [
          'id', 'name', 'description', 'price', 'primary', 'secondary',
          'tertiary', 'fourthly', 'category_id', 'provider_id'
        ],
        include: [
          { model: File, as: 'primary_image', attributes: ['name', 'path', 'url'] },
          { model: File, as: 'secondary_image', attributes: ['name', 'path', 'url'] },
          { model: File, as: 'tertiary_image', attributes: ['name', 'path', 'url'] },
          { model: File, as: 'fourthly_image', attributes: ['name', 'path', 'url'] },
          {
            model: Category, as: 'category', attributes: ['id', 'name', 'description', 'image_id'],
            include: [
              { model: File, as: 'image', attributes: ['name', 'path', 'url'] }
            ]
          },
          {
            model: Provider, as: 'provider', attributes: ['id', 'name', 'description', 'image_id'],
            include: [
              { model: File, as: 'image', attributes: ['name', 'path', 'url'] }
            ]
          },
        ]
      })

      if (!product) {
        return res.status(400).json({ error: 'Product not found' })
      }

      return res.json(product)
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async store (req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string().required(),
        price: Yup.number(),
        primary: Yup.number(),
        secondary: Yup.number(),
        tertiary: Yup.number(),
        fourthly: Yup.number(),
        category_id: Yup.number().required(),
        provider_id: Yup.number().required()
      })

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' })
      }

      const ProductExists = await Product.findOne({ where: { name: req.body.name } })

      if (ProductExists) {
        return res.status(400).json({ error: 'Product already exists' })
      }

      const {
        name, description, price, primary, secondary, tertiary, fourthly, category_id, provider_id
      } = await Product.create(req.body)

      return res.json({
        name, description, price, primary, secondary, tertiary, fourthly, category_id, provider_id
      })
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async update (req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        description: Yup.string(),
        primary: Yup.number(),
        secondary: Yup.number(),
        tertiary: Yup.number(),
        fourthly: Yup.number(),
        category_id: Yup.number(),
        provider_id: Yup.number()
      })

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' })
      }

      const { id } = req.params

      const product = await Product.findByPk(id)

      if (!product) {
        return res.status(400).json({ error: 'Product not found' })
      }

      const {
        name, description, price, primary, secondary, tertiary, fourthly, category_id, provider_id
      } = await product.update(req.body)

      return res.json({
        name, description, price, primary, secondary, tertiary, fourthly, category_id, provider_id
      })
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async destroy (req, res) {
    try {
      const { id } = req.params

      const product = await Product.findByPk(id)

      if (!product) {
        return res.status(400).json({ error: 'Product not found' })
      }

      await product.destroy()

      return res.json({ message: 'Item deleted' })
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }
}

export default new ProductController()