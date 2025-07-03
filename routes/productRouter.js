import express from 'express'
import getAllClothController from '../controller/product/getAllCloth.js'
import getAllCategoriesController from '../controller/product/getAllCategories.js'

const productRouter = express.Router()

productRouter.get('/cloth' , getAllClothController)
productRouter.get('/categories' , getAllCategoriesController)

export default productRouter