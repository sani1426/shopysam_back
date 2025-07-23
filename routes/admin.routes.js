import express from 'express'
import Admin from '../middlewares/Admin.js'
import { getAllUsersController } from '../controller/admin.controller.js'


const adminRouter = express.Router()

adminRouter.get('/all-users' , Admin, getAllUsersController)

export default adminRouter