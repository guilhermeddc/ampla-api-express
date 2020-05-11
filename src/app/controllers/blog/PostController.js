import * as Yup from 'yup'

import Post from '../../models/blog/Post'
import File from '../../models/File'

class PostController {
  async index (req, res) {
    try {
      const posts = await Post.findAll({
        attributes: ['id', 'title', 'description', 'author', 'image_id'],
        include: [
          { model: File, as: 'image', attributes: ['name', 'path', 'url'] }
        ]
      })

      return res.json(posts)
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async show (req, res) {
    try {
      const { id } = req.params

      const post = await Post.findByPk(id, {
        include: [
          { model: File, as: 'image', attributes: ['name', 'path', 'url'] }
        ]
      })

      if (!post) {
        return res.status(400).json({ error: 'Post not found' })
      }

      return res.json(post)
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async store (req, res) {
    try {
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
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async update (req, res) {
    try {
      const schema = Yup.object().shape({
        title: Yup.string(),
        description: Yup.string(),
        image_id: Yup.number()
      })

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' })
      }

      const { id } = req.params

      const post = await Post.findByPk(id)

      if (!post) {
        return res.status(400).json({ error: 'Post not found' })
      }

      const { title, description, image_id } = await post.update(req.body)

      return res.json({ title, description, image_id })
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async destroy (req, res) {
    try {
      const { id } = req.params

      const post = await Post.findByPk(id)

      if (!post) {
        return res.status(400).json({ error: 'Post not found' })
      }

      await post.destroy()

      return res.json({ message: 'Item deleted' })
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }
}

export default new PostController()