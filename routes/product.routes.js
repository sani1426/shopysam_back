
import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import Admin from '../middlewares/Admin.js'
import { createProductController, deleteProductController, getAllProductController, getProductByCategoryController, getProductBySubCategoryController, getProductDetailsController, updateProductController } from '../controller/product.controller.js'

const productRouter = express.Router()

productRouter.post('/create' ,verifyToken,Admin,createProductController)
productRouter.put('/update' ,verifyToken,Admin,updateProductController)
productRouter.delete('/delete' ,verifyToken,Admin,deleteProductController)
productRouter.get('/all' ,getAllProductController)
productRouter.post('/by-category' ,getProductByCategoryController)
productRouter.post('/by-subcategory' ,getProductBySubCategoryController)
productRouter.get('/details/:id' ,getProductDetailsController)

export default productRouter