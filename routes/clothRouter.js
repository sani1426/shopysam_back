import express from 'express'
import getAllClothCategories from '../controller/Cloth/getAllCategories.js'
import filteringClothProducts from '../controller/Cloth/getClothByFilters.js'

const clothRouter = express.Router()

clothRouter.get('/categories' , getAllClothCategories)
clothRouter.get('/filtering' , filteringClothProducts)


export default clothRouter