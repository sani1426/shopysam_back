import ClothModel from "../../models/clothModel.js"


const filteringClothProducts = async (req, res) => {
  try {
    const {
      category,
      brand,
      tags,
      sizes,
      colors,
      minPrice,
      maxPrice,
      sortBy,
      search,
      ppg,
    } = req.query
    const pageNumber = req.query.pageNumber || 1

    let query = {}
    if (category && category !== 'all') {
      query.category = category.toLowerCase()
    }
    if (brand && brand !== 'all') query.brand = brand
    if (colors) query.colors = { $in: [colors] }
    if (sizes) query.sizes = { $in: [sizes] }
    if (tags) query.tags = { $in: [tags] }

    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number(minPrice)
      if (maxPrice) query.price.$lte = Number(maxPrice)
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
      ]
    }

    let sort = {}
    if (sortBy) {
      switch (sortBy) {
        case 'priceAsc':
          sort = { price: 1 }
          break
        case 'priceDesc':
          sort = { price: -1 }
          break
        default:
          break
      }
    }
    const clothes = await ClothModel.find(query)
      .sort(sort).skip((Number(pageNumber) - 1) * Number(ppg))
      .limit(Number(ppg))

    res.status(200).json({
      error: false,
      success: true,
      data: clothes,
      message: 'successfully get filtered',
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: `server error ${error}`,
    })
  }
}

export default filteringClothProducts