import CategoryModel from '../models/category.model.js'
import UserModel from '../models/userModel.js'

//  ========> get all users controller <======== //
const getAllUsersController = async (req, res) => {
  try {
    const users = await UserModel.find()
    const totalUser = await UserModel.countDocuments()

    res.status(200).json({
      error: false,
      success: true,
      message: 'successfully get all users',
      data: users,
      counter: totalUser,
    })
  } catch (error) {
    return res.status(500).json({
      message: `server error ${error}`,
      error: true,
      success: false,
    })
  }
}

//  ========> upload category controller <======== //
const uploadCategoryController = async (req, res) => {
  try {
    const { name, image } = req.body
    if (!name || !image) {
      return res.status(400).json({
        error: true,
        success: false,
        message: 'Enter All Required Fieldes',
      })
    }

    const addCategory = new CategoryModel({
      name,
      image,
    })
    const saveCategory = await addCategory.save()

    if(!saveCategory){
      return res.status(500).json({
        error: true,
        success: false,
        message: 'Not Created',
      })
    }

    return res.status(201).json({
      error: false,
      success: true,
      message: 'Successfully Added New Category',
      data: saveCategory,
    })
  } catch (error) {
    return res.status(500).json({
      message: `server error ${error}`,
      error: true,
      success: false,
    })
  }
}

//  ========> update category controller <======== //
const updateCategoryController = async (req , res) =>{
  try {
    const { _id ,name, image } = req.body 

    const update = await CategoryModel.updateOne({
        _id : _id
    },{
       name : name ,
       image :image
    })

    return res.json({
        message : "Updated Category",
        success : true,
        error : false,
        data : update
    })
} catch (error) {
    return res.status(500).json({
        message : `Server Error ${error}`,
        error : true,
        success : false
    })
}
}




export { getAllUsersController, uploadCategoryController ,updateCategoryController}
