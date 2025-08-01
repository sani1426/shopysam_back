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

const getAllProductController = async (req,res) => {
  try {
    
    const allProducts = await ProductModel.find().populate('category subCategory')
    const counter = await ProductModel.countDocuments()

    return res.status(200).json({
      error:false ,
      success : true ,
      message : 'Success',
      data:allProducts ,
      counter : counter
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      success: false,
      message: `Server Error ${error}`,
    })
  }
}

const updateProductController = async (req,res) => {
  try {
    const {_id} = req.body

    if(!_id){
      return res.status(400).json({
          message : "provide product _id",
          error : true,
          success : false
      })
  }

  const updateProduct = await ProductModel.updateOne({ _id : _id },{
    ...req.body
},{new : true})
    
return res.status(201).json({
  error : false ,
  success : true ,
  message : "Product Updated Successfully",
  data : updateProduct
})
  } catch (error) {
    return res.status(500).json({
      error: true,
      success: false,
      message: `Server Error ${error}`,
    })
  }
}


const deleteProductController = async (req, res) => {
  try {
    const {_id} = req.body

    if(!_id){
      return res.status(400).json({
          message : "provide product _id",
          error : true,
          success : false
      })
  }

  const deleteProduct = await ProductModel.deleteOne({_id : _id})

  return res.status(200).json({
    error: false ,
    success : true ,
    message: "Product Successfully Deleted",
    data: deleteProduct
  })
    
  } catch (error) {
    return res.status(500).json({
      error: true,
      success: false,
      message: `Server Error ${error}`,
    })
  }
}
export { createProductController,getAllProductController ,updateProductController ,deleteProductController}
