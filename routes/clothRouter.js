import express from 'express'
import getAllClothCategories from '../controller/Cloth/getAllCategories.js'

const clothRouter = express.Router()

clothRouter.get('/categories' , getAllClothCategories)


export default clothRouter