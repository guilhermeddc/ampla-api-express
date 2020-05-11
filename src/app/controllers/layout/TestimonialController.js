import * as Yup from 'yup'

import Testimonial from '../../models/layout/Testimonial'
import File from '../../models/File'

class TestimonialController {
  async index (req, res) {
    try {
      const testimonials = await Testimonial.findAll({
        include: [
          { model: File, as: 'image', attributes: ['name', 'path', 'url'] },
        ]
      })

      return res.json(testimonials)
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async show (req, res) {
    try {
      const { id } = req.params

      const testimonial = await Testimonial.findByPk(id, {
        include: [
          { model: File, as: 'image', attributes: ['name', 'path', 'url'] },
        ]
      })

      if (!testimonial) {
        return res.status(400).json({ error: 'Testimonial not found' })
      }

      return res.json(testimonial)
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async store (req, res) {
    try {
      const schema = Yup.object().shape({
        client: Yup.string().required(),
        architect: Yup.string().required(),
        description: Yup.string().required(),
        image_id: Yup.number().required(),
      })

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' })
      }

      const {
        id, client, architect, description, image_id
      } = await Testimonial.create(req.body)

      return res.json({ id, client, architect, description, image_id })
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async update (req, res) {
    try {
      const schema = Yup.object().shape({
        client: Yup.string(),
        architect: Yup.string(),
        description: Yup.string(),
        image_id: Yup.number(),
      })

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' })
      }

      const { id } = req.params

      const testimonial = await Testimonial.findByPk(id)

      if (!testimonial) {
        return res.status(400).json({ error: 'Testimonial not found' })
      }

      const {
        client, architect, description, image_id
      } = await testimonial.update(req.body)

      return res.json({
        client, architect, description, image_id
      })
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async destroy (req, res) {
    try {
      const { id } = req.params

      const testimonial = await Testimonial.findByPk(id)

      if (!testimonial) {
        return res.status(400).json({ error: 'Testimonial not found' })
      }

      await testimonial.destroy()

      return res.json({ message: 'Item deleted' })
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }
}

export default new TestimonialController()