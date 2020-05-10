import ProductImage from '../../models/store/ProductImage'
import Product from '../../models/store/Product'

class ProductImageController {
  async index(req, res) {
    const { product_id } = req.params;

    const product = await Product.findByPk(product_id, {
      include: { association: 'images' }
    });
    
    return res.json(product.images);
  }

  async store (req, res) {
    const { product_id } = req.params
    const { originalname: name, filename: path } = req.file

    const productExists = await Product.findByPk(product_id)

    if (!productExists) {
      return res.status(400).json({ error: 'Product not found' })
    }

    const productImage = await ProductImage.create({ name, path, product_id })

    return res.json(productImage)
  }
}

export default new ProductImageController()