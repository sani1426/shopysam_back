import express from 'express'
import Admin from '../middlewares/Admin.js'
import { getAllUsersController, updateCategoryController, uploadCategoryController } from '../controller/admin.controller.js'
import verifyToken from '../middlewares/verifyToken.js'


const adminRouter = express.Router()

adminRouter.get('/all-users' ,verifyToken, Admin, getAllUsersController)
adminRouter.post('/upload-category' ,verifyToken, Admin, uploadCategoryController)
adminRouter.put('/update-category' ,verifyToken, Admin, updateCategoryController)

export default adminRouter