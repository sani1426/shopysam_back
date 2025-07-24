import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import { uploadImageController } from '../controller/uploadImage.controller.js'
import upload from '../middlewares/multer.js'
import Admin from '../middlewares/Admin.js'
const uploadRouter = express.Router()

uploadRouter.post('/upload' ,verifyToken,Admin, upload.single("image"),uploadImageController)
export default uploadRouter