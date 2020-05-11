import * as Yup from 'yup'

import Comment from '../../models/blog/Comment'

class CommentController {
  async index (req, res) {
    try {
      const posts = await Comment.findAll({
        where: { accepted: true, post_id: req.params.id },
        attributes: ['id', 'name', 'commentary', 'post_id'],
      })

      return res.json(posts)
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async store (req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        commentary: Yup.string().required(),
        post_id: Yup.number().required()
      })

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' })
      }

      const { name, commentary, post_id } = await Comment.create(req.body)

      return res.json({ name, commentary, post_id })
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async update (req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        commentary: Yup.string(),
        post_id: Yup.number()
      })

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' })
      }

      const { id } = req.params

      const comment = await Comment.findByPk(id)

      if (!comment) {
        return res.status(400).json({ error: 'Comment not found' })
      }

      const { name, commentary, post_id } = await comment.update(req.body)

      return res.json({ name, commentary, post_id })
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async destroy (req, res) {
    try {
      const { id } = req.params

      const comment = await Comment.findByPk(id)

      if (!comment) {
        return res.status(400).json({ error: 'Comment not found' })
      }

      await comment.destroy()

      return res.json({ message: 'Item deleted' })
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }
}

export default new CommentController()