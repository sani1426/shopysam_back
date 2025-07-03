import express from 'express'
import getAllCategoriesController from '../controller/digital/getAllCategories.js'


const digitalRouter = express.Router()

digitalRouter.get('/categories' , getAllCategoriesController)


export default digitalRouter