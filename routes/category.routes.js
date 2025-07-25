import express from 'express'
import getAllCategoryController from '../controller/category.controller.js'
const categoryRouter = express.Router()

categoryRouter.get('/all', getAllCategoryController)

export default categoryRouter