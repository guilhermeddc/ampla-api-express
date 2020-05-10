import * as Yup from 'yup'

import Banner from '../../models/layout/Banner'
import File from '../../models/File'

class BannerController {
  async index (req, res) {
    const banners = await Banner.findAll({
      attributes: [
        'id', 'title', 'link', 'route', 'background_id', 'logo_id', 'post_id', 'product_id'
      ],
      include: [
        { model: File, as: 'background', attributes: ['name', 'path', 'url'] },
        { model: File, as: 'logo', attributes: ['name', 'path', 'url'] },
      ]
    })

    return res.json(banners)
  }

  async show (req, res) {
    const { id } = req.params

    const banner = await Banner.findByPk(id, {
      attributes: [
        'id', 'title', 'link', 'route', 'background_id', 'logo_id', 'post_id', 'product_id'
      ],
      include: [
        { model: File, as: 'background', attributes: ['name', 'path', 'url'] },
        { model: File, as: 'logo', attributes: ['name', 'path', 'url'] },
      ]
    })

    return res.json(banner)
  }

  async store (req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      link: Yup.boolean(),
      background_id: Yup.number().required(),
      logo_id: Yup.number().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const {
      id, title, link, route, background_id, logo_id, product_id, post_id
    } = await Banner.create(req.body)

    return res.json({
      id, title, link, route, background_id, logo_id, product_id, post_id
    })
  }
}

export default new BannerController()