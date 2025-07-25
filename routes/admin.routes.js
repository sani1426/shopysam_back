import express from 'express'
import Admin from '../middlewares/Admin.js'
import {
  deleteCategoryController,
  getAllUsersController,
  updateCategoryController,
  uploadCategoryController,
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
adminRouter.post(
  '/delete-category',
  verifyToken,
  Admin,
  deleteCategoryController
)

export default adminRouter
