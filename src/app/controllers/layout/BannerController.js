import * as Yup from 'yup'

import Banner from '../../models/layout/Banner'
import File from '../../models/File'

class BannerController {
  async index (req, res) {
    try {
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
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async show (req, res) {
    try {
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

      if (!banner) {
        return res.status(400).json({ error: 'Banner not found' })
      }

      return res.json(banner)
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async store (req, res) {
    try {
      const schema = Yup.object().shape({
        title: Yup.string(),
        link: Yup.boolean(),
        route: Yup.number(),
        background_id: Yup.number().required(),
        logo_id: Yup.number().required(),
        product_id: Yup.number(),
        post_id: Yup.number(),
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
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }
  async update (req, res) {
    try {
      const schema = Yup.object().shape({
        title: Yup.string(),
        link: Yup.boolean(),
        route: Yup.number(),
        background_id: Yup.number(),
        logo_id: Yup.number(),
        product_id: Yup.number(),
        post_id: Yup.number(),
      })

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' })
      }

      const { id } = req.params

      const banner = await Banner.findByPk(id)

      if (!banner) {
        return res.status(400).json({ error: 'Banner not found' })
      }

      const {
        title, link, route, background_id, logo_id, product_id, post_id
      } = await banner.update(req.body)

      return res.json({
        title, link, route, background_id, logo_id, product_id, post_id
      })
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async destroy (req, res) {
    try {
      const { id } = req.params

      const banner = await Banner.findByPk(id)

      if (!banner) {
        return res.status(400).json({ error: 'Banner not found' })
      }

      await banner.destroy()

      return res.json({ message: 'Item deleted' })
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }
}

export default new BannerController()