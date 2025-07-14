import express from 'express'

import verifyToken from '../middlewares/verifyToken.js'
import {
  loginController,
  logoutController,
  registerController,
  userDetailsController,
  verifyEmailController,
} from '../controller/user/auth-controllers.js'

const userRouter = express.Router()

userRouter.post('/register', registerController)
userRouter.post('/verify-email', verifyEmailController)
userRouter.post('/login', loginController)
userRouter.get('/logout', logoutController)
userRouter.get('/details', verifyToken, userDetailsController)

export default userRouter
