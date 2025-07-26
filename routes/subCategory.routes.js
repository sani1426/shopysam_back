import express from 'express'
import { getSubCategoryController } from '../controller/subCategory.controller.js'

const subCategoryRouter = express.Router()

subCategoryRouter.get('/all' , getSubCategoryController)

export default subCategoryRouter