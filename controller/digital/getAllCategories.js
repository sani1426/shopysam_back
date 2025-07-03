import DigitalModel from '../../models/digitalProductModel.js'

const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await DigitalModel.distinct('category')

    res.status(200).json({
      error: false,
      success: true,
      data: categories,
      message: 'successfully get all categories',
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: `server error ${error}`,
    })
  }
}

export default getAllCategoriesController
