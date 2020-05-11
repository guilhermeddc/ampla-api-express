import File from '../models/File'

class FileController {
  async index (req, res) {
    try {
      const files = await File.findAll()

      return res.json(files)
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async show (req, res) {
    try {
      const { id } = req.params

      const file = await File.findByPk(id)

      if (!file) {
        return res.status(400).json({ error: 'File not found' })
      }

      return res.json(file)
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async store (req, res) {
    try {
      const { originalname: name, filename: path } = req.file

      const file = await File.create({ name, path })

      return res.json(file)
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }

  async destroy (req, res) {
    try {
      const { id } = req.params

      const file = await File.findByPk(id)

      if (!file) {
        return res.status(400).json({ error: 'File not found' })
      }

      await file.destroy()

      return res.json({ message: 'Item deleted' })
    } catch (error) {
      return res.status(400).json({ error: 'System internal error' })
    }
  }
}

export default new FileController()