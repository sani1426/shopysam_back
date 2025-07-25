import CategoryModel from '../models/category.model.js'

const getAllCategoryController = async (req, res) => {
  try {
    // const {PageNumber}=req.query || 1
    // const Cpg = 10

    const categories = await CategoryModel.find()

    return res.status(200).json({
      error: false,
      success: true,
      message: 'Success',
      data: categories,
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      success: false,
      message: `ServerError ${error}`,
    })
  }
}

export default getAllCategoryController
