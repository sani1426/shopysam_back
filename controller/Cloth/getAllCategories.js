import ClothModel from '../../models/clothModel.js'

const getAllClothCategories = async (req, res) => {
  try {
    const categories = await ClothModel.distinct('category')
    res.status(200).json({
      error: false,
      success: true,
      data: categories,
      message: 'success',
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: `server error ${error}`,
    })
  }
}

export default getAllClothCategories
