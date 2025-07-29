
import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import Admin from '../middlewares/Admin.js'
import { createProductController } from '../controller/product.controller.js'

const productRouter = express.Router()

productRouter.post('/create' ,verifyToken,Admin,createProductController)

export default productRouter