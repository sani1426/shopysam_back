import express from 'express'
import Admin from '../middlewares/Admin.js'
import {
  deleteCategoryController,
  deleteSubCategoryController,
  getAllUsersController,
  updateCategoryController,
  updateSubCategoryController,
  uploadCategoryController,
  uploadSubCategoryController,
} from '../controller/admin.controller.js'
import verifyToken from '../middlewares/verifyToken.js'

const adminRouter = express.Router()

adminRouter.get('/all-users', verifyToken, Admin, getAllUsersController)
adminRouter.post(
  '/upload-category',
  verifyToken,
  Admin,
  uploadCategoryController
)
adminRouter.post(
  '/update-category',
  verifyToken,
  Admin,
  updateCategoryController
)
adminRouter.delete(
  '/delete-category',
  verifyToken,
  Admin,
  deleteCategoryController
)
adminRouter.post(
  '/add-subcategory',
  verifyToken,
  Admin,
  uploadSubCategoryController
)
adminRouter.put(
  '/update-subcategory',
  verifyToken,
  Admin,
  updateSubCategoryController
)
adminRouter.delete(
  '/delete-subcategory',
  verifyToken,
  Admin,
  deleteSubCategoryController
)

export default adminRouter
