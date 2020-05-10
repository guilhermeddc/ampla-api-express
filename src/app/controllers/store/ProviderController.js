import * as Yup from 'yup'

import Provider from '../../models/store/Provider'
import File from '../../models/File'

class ProviderController {
  async index (req, res) {
    const providers = await Provider.findAll({
      attributes: ['id', 'name', 'description', 'image_id'],
      include: [
        { model: File, as: 'image', attributes: ['name', 'path', 'url'] }
      ]
    })

    return res.json(providers)
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

    const providerExists = await Provider.findOne({ where: { name: req.body.name } })

    if (providerExists) {
      return res.status(400).json({ error: 'Provider already exists' })
    }

    const { id, name, description, image_id } = await Provider.create(req.body)

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

    const { id, name, description, image_id } = await Provider.update(req.body)

    return res.json({ id, name, description, image_id })
  }
}

export default new ProviderController()