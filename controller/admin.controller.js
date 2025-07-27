import CategoryModel from '../models/category.model.js'
import ProductModel from '../models/product.model.js'
import SubCategoryModel from '../models/subCategory.model.js'
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

    if (!saveCategory) {
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
const updateCategoryController = async (req, res) => {
  try {
    const { _id, name, image } = req.body

    const update = await CategoryModel.updateOne(
      {
        _id: _id,
      },
      {
        name: name,
        image: image,
      }
    )

    return res.json({
      message: 'Updated Category',
      success: true,
      error: false,
      data: update,
    })
  } catch (error) {
    return res.status(500).json({
      message: `Server Error ${error}`,
      error: true,
      success: false,
    })
  }
}

//  ========> delete category controller <======== //
const deleteCategoryController = async (req, res) => {
  try {
    const { _id } = req.body

    const checkSubCategory = await SubCategoryModel.find({
      category: {
        $in: [_id],
      },
    }).countDocuments()

    const checkProduct = await ProductModel.find({
      category: {
        $in: [_id],
      },
    }).countDocuments()

    if (checkSubCategory > 0 || checkProduct > 0) {
      return res.status(400).json({
        message: "Category is already use can't delete",
        error: true,
        success: false,
      })
    }

    const deleteCategory = await CategoryModel.deleteOne({ _id: _id })

    return res.json({
      message: 'Delete category successfully',
      data: deleteCategory,
      error: false,
      success: true,
    })
  } catch (error) {
    return res.status(500).json({
      message: `Server Error ${error}`,
      success: false,
      error: true,
    })
  }
}

//  ========> upload sub category controller <======== //
const uploadSubCategoryController = async (req, res) => {
  try {
    const { name, image, category } = req.body

    if (!name && !image && !category[0]) {
      return res.status(400).json({
        message: 'Provide name, image, category',
        error: true,
        success: false,
      })
    }
    const payload = {
      name,
      image,
      category,
    }

    const createSubCategory = new SubCategoryModel(payload)
    const newSubCategory = await createSubCategory.save()

    return res.status(201).json({
      error: false,
      success: true,
      message: 'Add New SubCategory Successfully',
      data: newSubCategory,
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      success: false,
      message: 'Server Error ${error}',
    })
  }
}

//  ========> update sub category controller <======== //
const updateSubCategoryController = async (req, res) => {
  try {
    const { _id, name, image, category } = req.body

    const checkSub = await SubCategoryModel.findById(_id)
    if (!checkSub) {
      return res.status(404).json({
        error: true,
        success: false,
        message: 'Check your _id',
      })
    }

    const update = await SubCategoryModel.findByIdAndUpdate(
      _id,
      {
        name,
        image,
        category,
      },
      { new: true }
    )

    return res.status(200).json({
      error: false,
      success: true,
      message: 'Updated Successfully',
      data: update,
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: `Server Error ${error}`,
    })
  }
}

//  ========> delete sub category controller <======== //
const deleteSubCategoryController = async (req, res) => {
  try {
    const { _id } = req.body

    const deleted = await SubCategoryModel.findByIdAndDelete(_id)

    return res.status(200).json({
      error: false,
      success: true,
      message: 'Deleted Successfully',
      data: deleted,
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      success: false,
      message: `Server Error ${error}`,
    })
  }
}
export {
  getAllUsersController,
  uploadCategoryController,
  updateCategoryController,
  deleteCategoryController,
  uploadSubCategoryController,
  updateSubCategoryController,
  deleteSubCategoryController,
}
