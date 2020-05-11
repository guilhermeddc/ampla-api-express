import User from '../models/User'
import File from '../models/File'

class AdminController {
  async index (req, res) {
    try {
      const admins = await User.findAll({
        where: { admin: true },
        attributes: ['id', 'name', 'email', 'avatar_id'],
        include: [
          { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] }
        ]
      })

      return res.json(admins)
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }
}

export default new AdminController()