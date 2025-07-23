import express from 'express'

import verifyToken from '../middlewares/verifyToken.js'
import {
  forgotPasswordController,
  loginController,
  logoutController,
  registerController,
  resetPasswordController,
  updateUserDetailsController,
  uploadAvatarController,
  userDetailsController,
  verifyEmailController,
  verifyForgotPasswordOtpController,
} from '../controller/auth.controller.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registerController)
userRouter.post('/verify-email', verifyEmailController)
userRouter.post('/login', loginController)
userRouter.get('/logout', logoutController)
userRouter.get('/details', verifyToken, userDetailsController)
userRouter.put('/update-user', verifyToken, updateUserDetailsController)
userRouter.put('/forgot-password', forgotPasswordController)
userRouter.put('/verify-otp', verifyForgotPasswordOtpController)
userRouter.put('/reset-password', resetPasswordController)

export default userRouter
