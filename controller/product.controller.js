import ProductModel from '../models/product.model.js'

const createProductController = async (req, res) => {
  try {
    const {
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
    } = req.body

    if (
      !name ||
      !image[0] ||
      !category[0] ||
      !subCategory[0] ||
      !unit ||
      !stock ||
      !price ||
      !discount ||
      !description
    ) {
      return res.status(403).json({
        error: true,
        success: false,
        message: 'Must Provide All Required Field',
      })
    }

    const create = new ProductModel({
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
    })

    const saveProduct = await create.save()

    return res.status(201).json({
      error: false,
      success: true,
      message: 'Product Created Successfully',
      data: saveProduct,
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      success: false,
      message: `Server Error ${error}`,
    })
  }
}

export { createProductController }
