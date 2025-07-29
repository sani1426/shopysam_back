
import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import Admin from '../middlewares/Admin.js'
import { createProductController, getAllProductController } from '../controller/product.controller.js'

const productRouter = express.Router()

productRouter.post('/create' ,verifyToken,Admin,createProductController)
productRouter.get('/all' ,getAllProductController)

export default productRouter