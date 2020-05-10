import * as Yup from 'yup'

import Post from '../../models/blog/Post'
import File from '../../models/File'

class PostController {
  async index (req, res) {
    const posts = await Post.findAll({
      attributes: ['id', 'title', 'description', 'author', 'image_id'],
      include: [
        { model: File, as: 'image', attributes: ['name', 'path', 'url'] }
      ]
    })

    return res.json(posts)
  }

  async store (req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      author: Yup.string().required(),
      image_id: Yup.number()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { id, title, description, author, image_id } = await Post.create(req.body)

    return res.json({ id, title, description, author, image_id })
  }

  async update (req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      image_id: Yup.number()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { id, title, description, image_id } = await Post.update(req.body)

    return res.json({ id, title, description, image_id })
  }
}

export default new PostController()