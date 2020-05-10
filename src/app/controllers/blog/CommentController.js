import * as Yup from 'yup'

import Comment from '../../models/blog/Comment'

class CommentController {
  async index (req, res) {
    const posts = await Comment.findAll({
      where: { accepted: true , post_id: req.params.id },
      attributes: ['id', 'name', 'commentary', 'post_id'],
    })

    return res.json(posts)
  }

  async store (req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      commentary: Yup.string().required(),
      post_id: Yup.number().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { id, name, commentary, post_id } = await Comment.create(req.body)

    return res.json({ id, name, commentary, post_id })
  }

  async update (req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      commentary: Yup.string(),
      post_id: Yup.number()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { id, name, commentary, post_id } = await Comment.update(req.body)

    return res.json({ id, name, commentary, post_id })
  }
}

export default new CommentController()