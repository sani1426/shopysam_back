import express from 'express'
import Admin from '../middlewares/Admin.js'
import { getAllUsersController, uploadCategoryController } from '../controller/admin.controller.js'
import verifyToken from '../middlewares/verifyToken.js'


const adminRouter = express.Router()

adminRouter.get('/all-users' ,verifyToken, Admin, getAllUsersController)
adminRouter.post('/upload-category' ,verifyToken, Admin, uploadCategoryController)

export default adminRouter