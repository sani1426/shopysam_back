import express from 'express'
import { getSubCategoryByCategoryId, getSubCategoryController } from '../controller/subCategory.controller.js'

const subCategoryRouter = express.Router()

subCategoryRouter.get('/all' , getSubCategoryController)
subCategoryRouter.post('/by-category-id' , getSubCategoryByCategoryId)

export default subCategoryRouter