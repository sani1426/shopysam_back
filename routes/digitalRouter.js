import express from 'express'
import getAllCategoriesController from '../controller/digital/getAllCategories.js'
import filteringDigitalProducts from '../controller/digital/getDigitalsByCategory.js'


const digitalRouter = express.Router()

digitalRouter.get('/categories' , getAllCategoriesController)
digitalRouter.get('/filtering' , filteringDigitalProducts)


export default digitalRouter