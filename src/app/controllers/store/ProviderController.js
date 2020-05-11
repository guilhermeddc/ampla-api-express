import * as Yup from 'yup'

import Provider from '../../models/store/Provider'
import File from '../../models/File'

class ProviderController {
  async index (req, res) {
    try {
      const providers = await Provider.findAll({
        attributes: ['id', 'name', 'description', 'image_id'],
        include: [
          { model: File, as: 'image', attributes: ['name', 'path', 'url'] }
        ]
      })

      return res.json(providers)
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async show (req, res) {
    try {
      const { id } = req.params

      const provider = await Provider.findByPk(id, {
        attributes: ['id', 'name', 'description', 'image_id'],
        include: [
          { model: File, as: 'image', attributes: ['name', 'path', 'url'] }
        ]
      })

      if (!provider) {
        return res.status(400).json({ error: 'Provider not found' })
      }

      return res.json(provider)
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

      const providerExists = await Provider.findOne({ where: { name: req.body.name } })

      if (providerExists) {
        return res.status(400).json({ error: 'Provider already exists' })
      }

      const { id, name, description, image_id } = await Provider.create(req.body)

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

      const provider = await Provider.findByPk(id)

      if (!provider) {
        return res.status(400).json({ error: 'Provider not found' })
      }

      const { name, description, image_id } = await provider.update(req.body)

      return res.json({ name, description, image_id })
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async destroy (req, res) {
    try {
      const { id } = req.params

      const provider = await Provider.findByPk(id)

      if (!provider) {
        return res.status(400).json({ error: 'Provider not found' })
      }

      await provider.destroy()

      return res.json({ message: 'Item deleted' })
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }
}

export default new ProviderController()