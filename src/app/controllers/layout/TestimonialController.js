import * as Yup from 'yup'

import Testimonial from '../../models/layout/Testimonial'
import File from '../../models/File'

class TestimonialController {
  async index (req, res) {
    const testimonials = await Testimonial.findAll({
      include: [
        { model: File, as: 'image', attributes: ['name', 'path', 'url'] },
      ]
    })

    return res.json(testimonials)
  }

  async show (req, res) {
    const { id } = req.params

    const testimonial = await Testimonial.findByPk(id, {
      include: [
        { model: File, as: 'image', attributes: ['name', 'path', 'url'] },
      ]
    })

    return res.json(testimonial)
  }

  async store (req, res) {
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
      client, architect, description, image_id
    } = await Testimonial.create(req.body)

    return res.json({ client, architect, description, image_id })
  }
}

export default new TestimonialController()